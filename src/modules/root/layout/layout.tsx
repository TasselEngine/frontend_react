import csses from "./layout.scss";
import React from "react";
import { Link } from "react-router-dom";
import { LayoutData, LeftContainer } from "../../../store/layout";
import { Mobx } from "../../../utils/mobx.util";
import { parse } from "../../../utils/css.util";

const { bind, select, map } = parse(csses);

@Mobx()
class TasselLeft extends React.Component<{}, {}> {

    render() {
        const mainStyle = map({
            "layout-slider": true,
            "light-scope": LayoutData.left.isCommon,
            "dark-scope": !LayoutData.left.isCommon
        });
        return (
            <div className={mainStyle}>
                <div className={bind("slider-inner")}>
                    <img className={bind("main-icon")} src="assets/img/icon.jpg" />
                    <p className={bind("name-title")}>
                        <span >Big Mogician</span>
                    </p>
                    <p className={bind("legend-title")} title="The personal blog created by Big Mogician.">
                        <b>大白痴同学😱</b>
                    </p>
                    {
                        <ul className={bind("slider-ul")}>
                            {LayoutData.left.list.map((item, index) => (
                                <li key={index}>
                                    <p>
                                        <Link to={item.path}>{item.label}</Link>
                                    </p>
                                </li>
                            ))}
                        </ul>
                    }
                </div>
            </div>
        );
    }

}

export class TasselLayout extends React.Component<{}, {}> {

    render() {
        return (
            <div className={bind("tassel-layout-main")}>
                <div className={bind("left")}>
                    <TasselLeft />
                </div>
                <div className={bind("right")}>
                    <div className={bind("layout-content")}>
                        {this.props.children}
                    </div>
                </div>
            </div>
        );
    }

}
