/**
 * ビューポートの設定を切り替え
 * 画面の幅が380px未満の場合：ビューポートを380pxに固定
 * それ以上の場合：デバイスの幅に基づいてビューポートを設定
 */
const switchViewport = () => {
    // ビューポート要素を取得
    const viewportMeta = document.querySelector('meta[name="viewport"]');

    // 条件に基づいて適用するビューポートの設定を決定
    const viewportContent = window.outerWidth > 380 ? "width=device-width, initial-scale=1" : "width=380";

    // ビューポート要素が存在しない場合はreturn
    if (!viewportMeta) return;

    // 現在のビューポートの設定が目的の設定と異なる場合にのみ、新しい設定を適用します。
    if (viewportMeta.getAttribute("content") !== viewportContent) {
        viewportMeta.setAttribute("content", viewportContent);
    }
};
switchViewport();

//dropdwon menu//

const initializedDropdownMenu = () => {
    const icon = document.querySelector(".js-dropdown-icon");
    const menu = document.querySelector(".js-menu");

    if (!icon || !menu) return;

    const openMenu = () => {
        gsap.fromTo(
            menu,
            {
                opacity: 0,
                scale: 0.95,
            },
            {
                opacity: 1,
                scale: 1,
                visibility: "visible",
                duration: 0.3,
                ease: "power2.out",
            }
        );
        menu.classList.add("is-active");
    };

    const closeMenu = () => {
        gsap.fromTo(
            menu,
            {
                opacity: 1,
                scale: 1,
            },
            {
                opacity: 0,
                scale: 0.95,
                duration: 0.3,
                ease: "power2.in",
                onComplete: () => {
                    menu.classList.remove("is-active");
                    menu.computedStyleMap.visibility = "hidden";
                },
            }
        );
    };

    icon.addEventListener("click", (e) => {
        if (menu.classList.contains("is-active")) {
            closeMenu();
        } else {
            openMenu();
        }
        e.stopPropagation();
    });

    document.addEventListener("click", () => {
        closeMenu();
    });

    menu.addEventListener("click", (e) => {
        e.stopPropagation();
    });

    document.addEventListener("keydown", (e) => {
        if (e.key === "Escape") {
            closeMenu();
        }
    });
};

initializedDropdownMenu();
