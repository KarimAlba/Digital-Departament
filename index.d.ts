declare module'*.scss' {
    const content: {[key: string]: any}
    export  = content
}

// declare module "\*.svg" {
//     import React = require("react");
//     const ReactComponent: React.FC<React.SVGProps<SVGSVGElement>>;
//     export default ReactComponent;
// }

declare module "*.svg";