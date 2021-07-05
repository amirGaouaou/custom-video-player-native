import { createElement, ReactElement, useEffect, useState, useRef } from "react";
import { ActivityIndicator, Text, View, StyleSheet } from "react-native";

import Video from "react-native-video";
import { CustomVideoPlayerProps } from "../typings/CustomVideoPlayerProps";
import { defaultVideoStyle, VideoStyle } from "./ui/Styles";
import deepmerge from "deepmerge";

const enum StatusEnum {
    ERROR = "error",
    LOADING = "loading",
    READY = "ready",
    NOT_READY = "not-ready"
}

export function CustomVideoPlayer(props: CustomVideoPlayerProps<VideoStyle>): ReactElement {
    const [styles, setStyles] = useState(StyleSheet.flatten([defaultVideoStyle, props.style]));
    const [status, setStatus] = useState(StatusEnum.NOT_READY);
    const [videoAspectRatio, setVideoAspectRatio] = useState(0);
    const VideoRef = useRef<Video>(null);
    let extraOptions = {};
    if (props.audioOnly && props.poster?.value) {
        extraOptions = {
            poster: props.poster.value
        };
    }

    useEffect(() => {
        const alteredStyles = deepmerge({}, styles);
        if (props.aspectRatio && videoAspectRatio !== 0) {
            alteredStyles.video.aspectRatio = videoAspectRatio;
            alteredStyles.container.aspectRatio = videoAspectRatio;
        } else if (!props.aspectRatio) {
            alteredStyles.container.aspectRatio = undefined;
            if (alteredStyles.video.width) {
                alteredStyles.container.width = alteredStyles.video.width;
            }
            if (alteredStyles.video.height) {
                alteredStyles.container.height = alteredStyles.video.height;
            }
        }
        setStyles(alteredStyles);
    }, [props.style, props.aspectRatio, videoAspectRatio]);

    const onLoad: any = (data: any) => {
        setStatus(StatusEnum.READY);
        console.log(data);
        if (data.currentTime > 0 && VideoRef && VideoRef.current) {
            VideoRef.current.seek(0);
        }
        if (data.naturalSize.width === 0 || data.naturalSize.height === 0) {
            setVideoAspectRatio(0);
        } else {
            setVideoAspectRatio(data.naturalSize.width / data.naturalSize.height);
        }
    };

    return (
        <View style={styles.container}>
            {status === StatusEnum.LOADING && <ActivityIndicator color={styles.indicator.color} size="large" />}
            {status === StatusEnum.ERROR && <Text style={styles.errorMessage}>The video failed to load :(</Text>}
            <Video
                testID={props.name}
                ref={VideoRef}
                source={{ uri: props.videoUrl ? props.videoUrl.value : undefined }}
                paused={!props.autoStart}
                audioOnly={props.audioOnly}
                ignoreSilentSwitch={props.ignoreSilentSwitch ? "ignore" : undefined}
                muted={props.muted}
                repeat={props.loop}
                controls={props.showControls}
                onLoadStart={() => setStatus(StatusEnum.LOADING)}
                onLoad={onLoad}
                onError={() => setStatus(StatusEnum.ERROR)}
                style={status !== StatusEnum.READY ? { height: 0 } : styles.video}
                useTextureView={false}
                resizeMode={props.aspectRatio ? "contain" : "stretch"}
                {...extraOptions}
            />
        </View>
    );
}
