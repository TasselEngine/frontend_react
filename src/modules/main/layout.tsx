import "./layout.css";
import React from "react";
import { Link } from "react-router-dom";
import { LayoutData, LeftContainer } from "../../store/layout";
import { Mobx } from "../../utils/mobx.util";

@Mobx()
class TasselLeft extends React.Component<{}, {}> {

    render() {
        const styles = {
            color: LayoutData.left.isCommon ? "#000" : "#fff",
            backgroundColor: LayoutData.left.isCommon ? "#fff" : "#484848"
        };
        return (
            <div>
                {
                    <ul style={styles}>
                        {LayoutData.left.list.map((item, index) => (
                            <li key={index}>
                                <Link to={item.path}>{item.label}</Link>
                            </li>
                        ))}
                    </ul>
                }
            </div>
        );
    }

}

export class TasselLayout extends React.Component<{}, {}> {

    render() {
        return (
            <div className="tassel-layout-main">
                <div className="left">
                    <TasselLeft />
                </div>
                <div className="right">{this.props.children}</div>
            </div>
        );
    }

}
