/**
 * Thank - кнопки для расшаривания в социальные сети
 * User: Bizikov
 * Blog: http://bizikov.ru
 * Version: 0.1.1
 */

(function () {
    function thank() {
        var btn = {
            'twitter': 'Twitter',
            'facebook': 'Facebook',
            'vkontakte': 'Вконтакте',
            'google': '+1'
        };

        var box = document.getElementById('thank-box');

        if(!box){
            return false;
        }

        // Информация о странице
        var sharing = {
            title: function () {
                return document.title;
            },
            url: function () {
                return location.href;
            },
            thumb: function () {
                var imageUrl = "";
                var metaList = document.getElementsByTagName('meta');

                for (var i = 0; i < metaList.length; i++) {
                    if (metaList[i].getAttribute("property") == "og:image" || metaList[i].getAttribute("name") == "twitter:image:src") {
                        imageUrl = metaList[i].getAttribute("content");
                    }
                }
                return imageUrl;
            },
            message: function () {
                var message = '';
                var metaList = document.getElementsByTagName('meta');

                for (var i = 0; i < metaList.length; i++) {

                    if (metaList[i].getAttribute("property") == "og:description" || metaList[i].getAttribute("name") == "twitter:description" || metaList[i].getAttribute("name") == "description") {
                        message = metaList[i].getAttribute("content");
                    }
                }
                return message;
            }
        };

        // Формирование ссылок
        var social = {
            twitter: function () {
                var url;
                url = 'http://twitter.com/share?';
                url += 'text=' + encodeURIComponent(sharing.title());
                url += '&url=' + encodeURIComponent(sharing.url());
                url += '&counturl=' + encodeURIComponent(sharing.url());
                return url;
            },
            google: function () {
                var url = 'https://plus.google.com/share?url=' + encodeURIComponent(sharing.url());
                return url;
            },
            facebook: function () {
                url = 'http://www.facebook.com/sharer.php?s=100';
                url += '&p[title]=' + encodeURIComponent(sharing.title());
                url += '&p[summary]=' + encodeURIComponent(sharing.message());
                url += '&p[url]=' + encodeURIComponent(sharing.url());
                url += '&p[images][0]=' + encodeURIComponent(sharing.thumb());
                return url;
            },
            vkontakte: function () {
                var url;
                url = 'http://vkontakte.ru/share.php?';
                url += 'url=' + encodeURIComponent(sharing.url());
                url += '&title=' + encodeURIComponent(sharing.title());
                url += '&description=' + encodeURIComponent(sharing.message());
                url += '&image=' + encodeURIComponent(sharing.thumb());
                url += '&noparse=true';
                return url;
            }
        };

        // Показываем окно для публикации запись в социальную сеть
        function send(url) {
            window.open(url, '', 'toolbar=0,status=0,width=500,height=400');
        }

        // Создаем html для кнопок
        function createSocialBtns() {
            var container = document.createElement('ul');
            container.setAttribute('class', 'thank-container');

            for (var b in btn) {
                var item = document.createElement('li');
                item.setAttribute('class', b);
                var link = document.createElement('a');
                link.innerText = btn[b];

                var icon = document.createElement('i');
                icon.setAttribute('class', 'icon-' + b);

                item.appendChild(icon);
                item.appendChild(link);
                container.appendChild(item);
                item.addEventListener('click', function (e) {
                    send(social[e.currentTarget.className]());
                });
            }
            box.appendChild(container);
        }

        createSocialBtns();
    }

    // Кроссбраузерное событие загрузки страницы
    if (window.addEventListener) {
        window.addEventListener("load", thank, false);
    } else if (window.attachEvent) {
        window.attachEvent("onload", thank);
    } else {
        window.onload = thank();
    }
})();