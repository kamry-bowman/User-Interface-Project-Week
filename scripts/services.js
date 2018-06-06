class Tabs {
    constructor(tabs) {
        this.element = tabs;
        this.tabs = Array.from(document.querySelectorAll('.tab'));
        this.links = Array.from(document.querySelectorAll('.tab-link'));
        this.links = this.links.map((link) => {
            return new TabLink(link, this)});
        this.activeLink = this.links[0];
        this.init();
    }

    updateActive (link) {
        this.activeLink.deactivateTab();
        this.activeLink = link;
        this.activeLink.activateTab();
    }

    init () {
        this.links.forEach((link) => {
            link.deactivateTab();
            link.element.addEventListener("click", link.updateTabsOnClick.bind(link));
        });
        this.activeLink.activateTab();
    }
}

class TabLink {
    constructor (link, parent) {
        this.element = link;
        this.parent = parent;
        this.data = this.element.dataset.tab;
        this.tabArr = this.getLinkedTabs();
    }
    getLinkedTabs() {
        return this.parent.tabs.filter((tab) => {
            return tab.dataset.tab === this.data;
        });
    }
    activateTab() {
        this.element.classList.add("selected");
        this.tabArr.forEach((tab) => {

            tab.classList.remove("hidden"); //just removes display: none
            let oldHeight = tab.clientHeight;
            oldHeight = "" + oldHeight + "px";
            TweenMax.set(tab, {height: 0, opacity: 0});
            TweenMax.to(tab, 5, {height: oldHeight , opacity: 1});

            //other method that did not work
            // TweenMax.set(tab, {height: "auto", opacity: 1});
            // TweenMax.from(tab, 2, {height: 0, opacity: 0});



        });
    }
    deactivateTab() {
        this.element.classList.remove("selected");
        this.tabArr.forEach((tab) => {
            TweenMax.to(tab, 5, {opacity: 0, height: 0});
            tab.classList.add("hidden");
        });
    }
    updateTabsOnClick() {
        this.parent.updateActive(this);
    }
}

let tabsArr = document.querySelectorAll(".tabs");
tabsArr = Array.from(tabsArr);
tabsArr = tabsArr.map((tabs) => {
    return new Tabs(tabs);
});

tabsArr.forEach((tabs) => {
    tabs.init();
});