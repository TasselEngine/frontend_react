import csses from "./layout.scss";
import React from "react";
import { Link } from "react-router-dom";
import { LeftContainer, PageState } from "@stores/layout";
import { parse, StoreComponent, Reactive, ReactiveComponent, DEBUG, AlwaysUpdate } from "@utils";

const { bind, select, map } = parse(csses);

@Reactive(LeftContainer)
class TasselLeft extends StoreComponent {

    private leftState: LeftContainer = this.getStore(LeftContainer);

    render() {
        const mainStyle = map({
            "layout-slider": true,
            "light-scope": this.leftState.isCommon,
            "dark-scope": !this.leftState.isCommon
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
                            {this.leftState.list.map((item, index) => (
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

@Reactive(PageState)
@AlwaysUpdate()
export class TasselLayout extends StoreComponent {

    private get pageState(): PageState { return this.getStore(PageState); }

    render() {
        console.log(this.props);
        DEBUG();
        console.log("render");
        const contentClass = map({
            'layout-content': true,
            'layout-content-transparent': this.pageState.isTransparent
        });
        return (
            <div className={bind("tassel-layout-main")}>
                <div className={bind("left")}>
                    <TasselLeft />
                </div>
                <div className={bind("right")}>
                    <div className={contentClass}>
                        {this.props.children}
                    </div>
                </div>
            </div>
        );
    }

}
