// Chuyển tab Product Small
window.addEventListener("template-loaded", () => {
    const tabsSelector = "product-left__item-small";
    const contentsSelector = "product-container";

    const tabActive = `${tabsSelector}--active`;
    const contentActive = `${contentsSelector}--active`;

    const tabContainers = $$(".js-tabs");
    tabContainers.forEach((tabContainer) => {
        const tabs = tabContainer.querySelectorAll(`.${tabsSelector}`);
        const contents = tabContainer.querySelectorAll(`.${contentsSelector}`);
        tabs.forEach((tab, index) => {
            tab.onclick = () => {
                tabContainer
                    .querySelector(`.${tabActive}`)
                    ?.classList.remove(tabActive);
                tabContainer
                    .querySelector(`.${contentActive}`)
                    ?.classList.remove(contentActive);
                tab.classList.add(tabActive);
                contents[index].classList.add(contentActive);
            };
        });
    });
});

/**
 * JS toggle
 *
 * Cách dùng:
 * <button class="js-toggle" toggle-target="#box" >Click</button>
 * <div id="box">Content show/hide</div>
 */
window.addEventListener("template-loaded", initJsToggle);

function initJsToggle() {
    $$(".js-toggle").forEach((button) => {
        const target = button.getAttribute("toggle-target");
        if (!target) {
            document.body.innerText = `Cần thêm toggle-target cho: ${button.outerHTML}`;
        }
        button.onclick = (e) => {
            e.preventDefault();

            if (!$(target)) {
                return (document.body.innerText = `Không tìm thấy phần tử "${target}"`);
            }
            const isHidden = $(target).classList.contains("hide");

            requestAnimationFrame(() => {
                $(target).classList.toggle("hide", !isHidden);
                $(target).classList.toggle("show", isHidden);
            });
        };
        document.onclick = function (e) {
            if (!e.target.closest(target)) {
                const isHidden = $(target).classList.contains("hide");
                if (!isHidden) {
                    button.click();
                }
            }
        };
    });
}

window.addEventListener("template-loaded", () => {
    const links = $$(".js-dropdown-list > li > a");

    links.forEach((link) => {
        link.onclick = () => {
            if (window.innerWidth > 991) return;
            const item = link.closest("li");
            item.classList.toggle("navbar__item--active");
        };
    });
});

document.addEventListener("DOMContentLoaded", function () {
    const menuItems = document.querySelectorAll(".menuItem");
    const navDropdown = document.querySelector(".navDropdown");
    const navbar = document.querySelector(".navbar");

    menuItems.forEach((item) => {
        item.addEventListener("mouseenter", () => {
            navDropdown.style.transform = "translateX(0)";
        });
    });

    navbar.addEventListener("mouseleave", () => {
        navDropdown.style.transform = "translateX(-100%)";
    });
});

// Login
document.addEventListener("DOMContentLoaded", function () {
    const signUpBtn = document.querySelector(".btnSignUp");
    const signInBtn = document.querySelector(".btnSignIn");
    const signUpModal = document.querySelector(".modal.signUp");
    const signInModal = document.querySelector(".modal.signIn");
    const overlays = document.querySelectorAll(".overlay");

    // Mở modal Đăng ký
    if (signUpBtn && signUpModal) {
        signUpBtn.addEventListener("click", function () {
            signUpModal.style.display = "flex";
        });
    }

    // Mở modal Đăng nhập
    if (signInBtn && signInModal) {
        signInBtn.addEventListener("click", function () {
            signInModal.style.display = "flex";
        });
    }

    // Đóng modal khi nhấn vào overlay
    overlays.forEach((overlay) => {
        overlay.addEventListener("click", function () {
            signUpModal.style.display = "none";
            signInModal.style.display = "none";
        });
    });

    // Đóng modal khi nhấn phím ESC
    document.addEventListener("keydown", function (event) {
        if (event.key === "Escape") {
            signUpModal.style.display = "none";
            signInModal.style.display = "none";
        }
    });
});

document.addEventListener("DOMContentLoaded", function () {
    // Các phần tử trong "Nạp BGold" và "Rút BGold"
    const topUpBtn = document.querySelector(".topUpBtn:nth-child(1)"); // Nạp BGold
    const withDrawBtn = document.querySelector(".topUpBtn:nth-child(2)"); // Rút BGold
    const topUpContainer = document.querySelector(".topUpContainer"); // Khu vực Nạp BGold
    const withDrawContainer = document.querySelector(".withDrawContainer"); // Khu vực Rút BGold

    // Các nút và form của "Nạp BGold"
    const topUpSmsBtn = document.querySelector(".topUpCtaBtn:nth-child(1)"); // Nạp qua SMS
    const topUpAtmBtn = document.querySelector(".topUpCtaBtn:nth-child(2)"); // Nạp qua ATM
    const topUpSmsForm = document.querySelector(".formTopUp.sms"); // Form SMS (Nạp)
    const topUpAtmForm = document.querySelector(".formTopUp.atm"); // Form ATM (Nạp)

    // 🔹 Các nút và form của "Rút BGold"
    const withDrawSmsBtn = document.querySelector(
        ".withDrawCtaBtn:nth-child(1)"
    ); // Rút qua SMS
    const withDrawAtmBtn = document.querySelector(
        ".withDrawCtaBtn:nth-child(2)"
    ); // Rút qua ATM
    const withDrawSmsForm = document.querySelector(".formWithDraw.sms"); // Form SMS (Rút)
    const withDrawAtmForm = document.querySelector(".formWithDraw.atm"); // Form ATM (Rút)

    // ✅ Mặc định hiển thị "Nạp BGold" và "SMS"
    topUpBtn.classList.add("active");
    topUpContainer.style.display = "block";
    withDrawContainer.style.display = "none";

    topUpSmsBtn.classList.add("active");
    topUpSmsForm.style.display = "grid";
    topUpAtmForm.style.display = "none";

    withDrawSmsBtn.classList.add("active");
    withDrawSmsForm.style.display = "grid";
    withDrawAtmForm.style.display = "none";

    //  Xử lý sự kiện khi nhấn "Nạp BGold"
    topUpBtn.addEventListener("click", function () {
        topUpBtn.classList.add("active");
        withDrawBtn.classList.remove("active");

        topUpContainer.style.display = "block";
        withDrawContainer.style.display = "none";
    });

    // 🔹 Xử lý sự kiện khi nhấn "Rút BGold"
    withDrawBtn.addEventListener("click", function () {
        withDrawBtn.classList.add("active");
        topUpBtn.classList.remove("active");

        topUpContainer.style.display = "none";
        withDrawContainer.style.display = "block";
    });

    // Xử lý sự kiện khi nhấn "SMS" trong "Nạp BGold"
    topUpSmsBtn.addEventListener("click", function () {
        topUpSmsBtn.classList.add("active");
        topUpAtmBtn.classList.remove("active");

        topUpSmsForm.style.display = "grid";
        topUpAtmForm.style.display = "none";
    });

    //  Xử lý sự kiện khi nhấn "ATM" trong "Nạp BGold"
    topUpAtmBtn.addEventListener("click", function () {
        topUpAtmBtn.classList.add("active");
        topUpSmsBtn.classList.remove("active");

        topUpAtmForm.style.display = "flex";
        topUpSmsForm.style.display = "none";
    });

    // 🔹 Xử lý sự kiện khi nhấn "SMS" trong "Rút BGold"
    withDrawSmsBtn.addEventListener("click", function () {
        withDrawSmsBtn.classList.add("active");
        withDrawAtmBtn.classList.remove("active");

        withDrawSmsForm.style.display = "grid";
        withDrawAtmForm.style.display = "none";
    });

    // 🔹 Xử lý sự kiện khi nhấn "ATM" trong "Rút BGold"
    withDrawAtmBtn.addEventListener("click", function () {
        withDrawAtmBtn.classList.add("active");
        withDrawSmsBtn.classList.remove("active");

        withDrawAtmForm.style.display = "grid";
        withDrawSmsForm.style.display = "none";
    });
});
