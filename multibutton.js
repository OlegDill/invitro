function ednaMultiButton(options) {
    const iframe = window.top.document.getElementById('chat-iframe');
    let isOpenChat = false;

    function onCloseViberBanner(e) {
        e && e.preventDefault();
        viberBanner.classList.remove(viberBannerOpen);
        iframe.style.width = '90px';
        iframe.style.height = '355px';
    }

    function onToggleViberBanner(e) {
        e && e.preventDefault();
        viberBanner.classList.toggle(viberBannerOpen);
        if (viberBanner.classList.contains(viberBannerOpen)) {
            if (window.top.innerWidth < 481) {
                iframe.style.width = '100vw';
                iframe.style.height = '206px';
                viberBanner.style.cssText = 'z-index: 9999; right: 0; bottom: 0; width: 100%;';
            } else {
                iframe.style.width = '440px';
            }
        } else {
            iframe.style.width = '90px';
        }
    }

    function addStyle(elementId, className, style) {
        document.getElementById(elementId).classList.add(className);
        const s = document.createElement('style');
        s.textContent = style;
        document.body.appendChild(s);
    }

    function removeChatClasses() {
        document.getElementById(chatContainerId).classList.remove(chatContainerClass);
        document.getElementById(chatIframeId).classList.remove(chatIframeClass);
    }

    function onChatButtonClick(e) {
        isOpenChat = true;
        e && e.preventDefault();
        container.classList.add(hideClass);
        ThreadsWidget.showChat();
        onButtonClick();
        onCloseViberBanner();
        addStyle(
            chatContainerId,
            chatContainerClass,
            `.${chatContainerClass}{top: 0 !important; right: 0 !important; width: 100vw !important; height: 100% !important;}`
        );
        addStyle(chatIframeId, chatIframeClass, `.${chatIframeClass}{height: 100% !important;}`);

        if (window.top.innerWidth < 481) {
            iframe.style.height = '100vh';
            iframe.style.width = '100vw';
            removeChatUpClass();
        } else {
            iframe.style.height = '580px';
            iframe.style.width = '410px';
            removeChatClasses();
        }
    }

    function onButtonClick(e) {
        e && e.preventDefault();

        const isActive = button.classList.contains(activeClass);

        if (isActive) {
            topButtons.classList.add(hideClass);
            leftButtons.classList.add(hideClass);
            onCloseViberBanner();
            iframe.style.width = '90px';
            iframe.style.height = '90px';
            if (countMessages.textContent) {
                countMessages.style.cssText = 'display: flex';
            }
        } else {
            topButtons.classList.remove(hideClass);
            leftButtons.classList.remove(hideClass);
            iframe.style.width = '90px';
            iframe.style.height = '355px';
            countMessages.style.cssText = 'display: none';
        }

        button.classList.toggle(activeClass);
    }

    function addChatUpClass() {
        window.top.document.getElementById(chatIframeContainer).classList.add(chatUp);
    }

    function removeChatUpClass() {
        window.top.document.getElementById(chatIframeContainer).classList.remove(chatUp);
    }

    const chatUp = 'chat-up';
    const chatIframeContainer = 'chat-iframe-container';
    const countMessagesClass = 'count-messages';
    const chatContainerId = '__threadswidget_chat__container';
    const chatIframeId = '__threadswidget_chat__iframe';
    const chatContainerClass = 'threadswidget-chat-container';
    const chatIframeClass = 'threadswidget-chat-iframe';
    const viberBannerOpen = 'edna-viber-banner__show';
    const buttonClass = 'ednamb-button';
    const topButtonsClass = 'ednamb-top-buttons';
    const leftButtonsClass = 'ednamb-left-buttons';
    const hideClass = 'ednamb-hide';
    const activeClass = 'ednamb-active';
    const containerId = options.containerId || 'ednamb-container';
    const leftButtonsList = options.leftButtons || [];
    const topButtonsList = options.topButtons || [];
    const container = document.getElementById(containerId);
    const button = container.querySelector('.' + buttonClass);
    const topButtons = container.querySelector('.' + topButtonsClass);
    const leftButtons = container.querySelector('.' + leftButtonsClass);
    const countMessages = container.querySelector('.' + countMessagesClass);

    const viberBanner = document.querySelector('.edna-viber-banner');
    const closeIconViberBanner = document.querySelector('.edna-banner__close');

    window.top.onresize = function (event) {
        if (window.top.innerWidth < 481 && isOpenChat) {
            if (window.top.document.querySelector('.' + chatUp)) {
                removeChatUpClass();
            }
            iframe.style.height = '100vh';
            iframe.style.width = '100vw';
            document.getElementById(chatContainerId).classList.add(chatContainerClass);
            document.getElementById(chatIframeId).classList.add(chatIframeClass);
        } else if (window.top.innerWidth >= 481 && isOpenChat) {
            iframe.style.height = '580px';
            iframe.style.width = '410px';
            removeChatClasses();
            addChatUpClass();
        } else if (window.top.innerWidth >= 481 && !isOpenChat) {
            addChatUpClass();
        }
    };

    button.addEventListener('click', onButtonClick);
    closeIconViberBanner.addEventListener('click', onCloseViberBanner);

    topButtonsList.forEach(function (item) {
        const a = document.createElement('a');

        a.href = item.url;
        a.textContent = item.text;
        a.classList.add('ednamb-top-button');
        topButtons.appendChild(a);
    });

    leftButtonsList.forEach(function (item) {
        const a = document.createElement('a');

        a.style.backgroundImage = 'url("' + item.image + '")';
        a.classList.add('ednamb-left-button');

        if (item.url) {
            a.href = item.url;
            a.target = '_blank';
        } else if (!item.url && item.id === 'viber') {
            a.addEventListener('click', onToggleViberBanner);
        } else if (!item.url && !item.id) {
            a.href = '#';

            const countMessagesElement = document.createElement('div');
            countMessagesElement.classList.add(countMessagesClass);
            a.appendChild(countMessagesElement);

            a.addEventListener('click', onChatButtonClick);
        }

        leftButtons.appendChild(a);
    });

    const hasThreads =
        leftButtonsList.findIndex(function (b) {
            return !b.url;
        }) >= 0;

    // функция обратного вызова при закрытии чата
    if (hasThreads && ThreadsWidget) {
        ThreadsWidget.onLoad(function () {
            ThreadsWidget.on('hideChat', function () {
                container.classList.remove(hideClass);
                iframe.style.height = '90px';
                iframe.style.width = '90px';
                isOpenChat = false;
                if (window.top.innerWidth < 481) {
                    addChatUpClass();
                }
            });
            getCountMessages();
        });
    }

    function getCountMessages() {
        ThreadsWidget.on('changeUnreadCounter', count => {
            const countMessagesByChatButton = leftButtons.querySelector('.' + countMessagesClass);
            if (count > 0) {
                countMessages.textContent = count;
                const isCloseChatBar = leftButtons.classList.contains(hideClass);
                if (isCloseChatBar) {
                    countMessages.style.cssText = 'display: flex';
                } else {
                    countMessages.style.cssText = 'display: none';
                }
                countMessagesByChatButton.style.cssText = 'display: flex';
                countMessagesByChatButton.textContent = count;
            } else {
                countMessages.textContent = '';
                countMessages.style.cssText = 'display: none';
                countMessagesByChatButton.textContent = '';
                countMessagesByChatButton.style.cssText = 'display: none';
            }
        });
    }
}