import {parse} from "node-html-parser";

export const noAttr = () => {
    return {
        name: "no-attribute",
        apply: 'build',
        enforce: 'post',
        transformIndexHtml(html) {
            const root = parse(html)
            const elList = root.querySelectorAll('script')
            for(let i=0;i<elList.length;i++) {
                //1.移除 <script type=module>元素
                const scriptType = elList[i].getAttribute('type')
                if(scriptType && scriptType=='module') {
                    elList[i].remove()
                }
                //2.移除 nomodule 属性
                const hasNoModule = elList[i].hasAttribute('nomodule')
                if(hasNoModule) {
                    elList[i].removeAttribute('nomodule')
                }
                // 3.移除 <script id=vite-legacy-entry> 元素的内容，并把 data-src 属性名改为 src
                const hasDataSrc = elList[i].hasAttribute('data-src')
                if(hasDataSrc) {
                    const legacyEle = elList[i]
                    const srcData = legacyEle.getAttribute('data-src')
                    legacyEle.setAttribute('src',srcData)
                    legacyEle.removeAttribute('data-src')
                    legacyEle.innerHTML= ''
                }
            }
            return root.toString()
        }
    }
}