import React from "react";
import css from "./image.scss";
import { parse } from "@utils";
import { Icon } from "@modules/commons/icon";

const { bind, select, map } = parse(css);

export interface SafeImageProps {
  width?: string;
  height?: string;
  phMinHeight?: string;
  phWidth?: string;
  phHeight?: string;
  phFontSize?: number;
  phBackColor?: string;
  phColor?: string;
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
      phWidth,
      phHeight,
      phMinHeight,
      phFontSize,
      phBackColor,
      phColor
    } = this.props;
    const styles = {
      width: width,
      height: height
    };
    const placeholderStyles = {
      width: phWidth || width,
      height: phHeight || height,
      minHeight: phMinHeight,
      fontSize: phFontSize && `${phFontSize}px`,
      backgroundColor: phBackColor,
      color: phColor
    };
    const imageCss = map([{ "safe-image": true }, className || ""]);
    const imagePlaceholderCss = map([{ "safe-image-placeholder": true }, className || ""]);
    return (
      this.state.loaded ?
        <img className={imageCss} style={styles} src={src} /> :
        <div className={imagePlaceholderCss} style={placeholderStyles}>
          <Icon type="picture" />
        </div>
    );
  }

}
