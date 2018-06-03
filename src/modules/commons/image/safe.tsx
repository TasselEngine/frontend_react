import React from "react";
import css from "./image.scss";
import { parse } from "@utils";

const { bind, select, map } = parse(css);

export interface SafeImageProps {
  width?: string;
  height?: string;
  placeholderWidth?: string;
  placeholderHeight?: string;
  src: string;
  className?: string;
}

export class CommonSafeImage extends React.PureComponent<SafeImageProps, { loaded: boolean }> {

  constructor(props: any) {
    super(props);
    this.state = {
      loaded: false
    };
    const img = new Image();
    img.onload = () => {
      this.onLoaded();
    };
    img.src = this.props.src;
  }

  onLoaded() {
    this.setState({ loaded: true });
  }

  render() {
    const {
      width,
      height,
      src,
      className,
      placeholderWidth,
      placeholderHeight
    } = this.props;
    const styles = {
      width: width,
      height: height
    };
    const placeholderStyles = {
      width: placeholderWidth || width,
      height: placeholderHeight || height
    };
    const imageCss = map([{ "safe-image": true }, className || ""]);
    return (
      this.state.loaded ?
        <img className={imageCss} style={styles} src={src} /> :
        <img className={imageCss} style={placeholderStyles} src="assets/img/unknown.png" />
    );
  }

}
