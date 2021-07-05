/**
 * This file was generated from CustomVideoPlayer.xml
 * WARNING: All changes made to this file will be overwritten
 * @author Mendix UI Content Team
 */
import { DynamicValue } from "mendix";

export interface CustomVideoPlayerProps<Style> {
    name: string;
    style: Style[];
    videoUrl: DynamicValue<string>;
    autoStart: boolean;
    muted: boolean;
    loop: boolean;
    ignoreSilentSwitch: boolean;
    audioOnly: boolean;
    aspectRatio: boolean;
    showControls: boolean;
    poster?: DynamicValue<string>;
}

export interface CustomVideoPlayerPreviewProps {
    class: string;
    style: string;
    videoUrl: string;
    autoStart: boolean;
    muted: boolean;
    loop: boolean;
    ignoreSilentSwitch: boolean;
    audioOnly: boolean;
    aspectRatio: boolean;
    showControls: boolean;
    poster: string;
}
