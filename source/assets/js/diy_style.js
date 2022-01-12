
function loadingPage(type) {
    $(function () {
        var a_idx = 0;
        // 鼠标点击出现文字
        $("body").click(function (e) {
            var a = new Array
                ("富强", "民主", "文明", "和谐", "自由", "平等", "公正", "法治", "爱国", "敬业", "诚信", "友善");
            var $i = $("<span/>").text(a[a_idx]);
            a_idx = (a_idx + 1) % a.length;
            var x = e.pageX,
                y = e.pageY;
            $i.css({
                "z-index": 5,
                "top": y - 20,
                "left": x,
                "position": "absolute",
                "font-weight": "bold",
                "color": "rgb(" + ~~(255 * Math.random()) + "," + ~~(255 * Math.random()) + "," + ~~(255 * Math.random()) + ")"
            });
            $("body").append($i);
            $i.animate({
                "top": y - 180,
                "opacity": 0
            },
                3000,
                function () {
                    $i.remove();
                });
        });
        setTimeout(function () {
            $(".buryit").removeAttr("onclick");
        }, 2000);
        var binft = function (r) {
            function t() {
                return b[Math.floor(Math.random() * b.length)]
            }
            function e() {
                return String.fromCharCode(94 * Math.random() + 33)
            }
            function n(r) {
                for (var n = document.createDocumentFragment(), i = 0; r > i; i++) {
                    var l = document.createElement("span");
                    l.textContent = e(), l.style.color = t(), n.appendChild(l)
                }
                return n
            }
            function i() {
                var t = o[c.skillI];
                c.step ? c.step-- : (c.step = g, c.prefixP < l.length ? (c.prefixP >= 0 && (c.text += l[c.prefixP]), c.prefixP++) : "forward" === c.direction ? c.skillP < t.length ? (c.text += t[c.skillP], c.skillP++) : c.delay ? c.delay-- : (c.direction = "backward", c.delay = a) : c.skillP > 0 ? (c.text = c.text.slice(0, -1), c.skillP--) : (c.skillI = (c.skillI + 1) % o.length, c.direction = "forward")), r.textContent = c.text, r.appendChild(n(c.prefixP < l.length ? Math.min(s, s + c.prefixP) : Math.min(s, t.length - c.skillP))), setTimeout(i, d)
            }
            var l = "",
                o = ["青青陵上柏，磊磊涧中石。", "人生天地间，忽如远行客。", "斗酒相娱乐，聊厚不为薄。", "驱车策驽马，游戏宛与洛。", "洛中何郁郁，冠带自相索。", "长衢罗夹巷，王侯多第宅。", "两宫遥相望，双阙百余尺。", "极宴娱心意，戚戚何所迫？", "相逢意气为君饮，系马高楼垂柳边。"].map(function (r) {
                    return r + ""
                }),
                a = 2,
                g = 1,
                s = 5,
                d = 75,
                b = ["rgb(110,64,170)", "rgb(150,61,179)", "rgb(191,60,175)", "rgb(228,65,157)", "rgb(254,75,131)", "rgb(255,94,99)", "rgb(255,120,71)", "rgb(251,150,51)", "rgb(226,183,47)", "rgb(198,214,60)", "rgb(175,240,91)", "rgb(127,246,88)", "rgb(82,246,103)", "rgb(48,239,130)", "rgb(29,223,163)", "rgb(26,199,194)", "rgb(35,171,216)", "rgb(54,140,225)", "rgb(76,110,219)", "rgb(96,84,200)"],
                c = {
                    text: "",
                    prefixP: -s,
                    skillI: 0,
                    skillP: 0,
                    direction: "forward",
                    delay: a,
                    step: g
                };
            i()
        };
        if ($("#jinrishici-sentence")[0]) {
            binft(document.getElementById('jinrishici-sentence'));
        }
        // 浏览器搞笑标题
        var OriginTitle = document.title;
        var titleTime;
        document.addEventListener('visibilitychange', function () {
            if (document.hidden) {
                $('[rel="icon"]').attr('href', "/funny.ico");
                document.title = '╭(°A°`)╮ 页面崩溃啦 ~';
                clearTimeout(titleTime);
            }
            else {
                $('[rel="icon"]').attr('href', "/favicon.ico");
                document.title = '(ฅ>ω<*ฅ) 噫又好啦 ~' + OriginTitle;
                titleTime = setTimeout(function () {
                    document.title = OriginTitle;
                }, 2000);
            }
        });
        // 留言
        $.get("https://v2.jinrishici.com/one.json", function (data) {
            $("#poem").html(data.data.content);
            $("#info").html("【" +
                data.data.origin.dynasty +
                "】" +
                data.data.origin.author +
                "《" +
                data.data.origin.title +
                "》");
        })
        // 关于我
        if ($("#bot-ui").length) {
            var botui = new BotUI("bot-ui");
            botui.message.bot({
                delay: 800,
                content: "Hi, my friend👋👋👋"
            }).then(function () {
                botui.message.bot({
                    delay: 1100,
                    content: "这里是 豆豆的空间"
                }).then(function () {
                    botui.message.bot({
                        delay: 1100,
                        content: "一个可爱的蓝孩子~"
                    }).then(function () {
                        botui.action.button({
                            delay: 1600,
                            action: [{
                                text: "你好呀！ 😃",
                                value: "sure"
                            }, {
                                text: "打住！ 🙄",
                                value: "skip"
                            }]
                        }).then(function (a) {
                            "sure" == a.value && sure();
                            "skip" == a.value && end()
                        })
                    })
                })
            });
            var sure = function () {
                botui.message.bot({
                    delay: 600,
                    content: "😘"
                }).then(function () {
                    secondpart()
                })
            },
                end = function () {
                    botui.message.bot({
                        delay: 600,
                        content: "![...](https://view.moezx.cc/images/2018/05/06/a1c4cd0452528b572af37952489372b6.md.jpg)"
                    })
                },
                secondpart = function () {
                    botui.message.bot({
                        delay: 1500,
                        content: "目前在上海工作"
                    }).then(function () {
                        botui.message.bot({
                            delay: 1500,
                            content: "是一名不正经的前端开发攻城狮"
                        }).then(function () {
                            botui.message.bot({
                                delay: 1200,
                                content: "一入编程深似海，即将淹死在这海中"
                            }).then(function () {
                                botui.message.bot({
                                    delay: 1500,
                                    content: "主要开发公众号，小程序，网站这些"
                                }).then(function () {
                                    botui.message.bot({
                                        delay: 1500,
                                        content: "什么vue、react、小程序啥的一路撸了过来"
                                    }).then(function () {
                                        botui.message.bot({
                                            delay: 1800,
                                            content: "平时也喜欢健身学些其他东西"
                                        }).then(function () {
                                            botui.action.button({
                                                delay: 1100,
                                                action: [{
                                                    text: "最喜欢做什么呢？ 😮",
                                                    value: "why-mashiro"
                                                }]
                                            }).then(function (a) {
                                                thirdpart()
                                            })
                                        })
                                    })
                                })
                            })
                        })
                    })
                },
                thirdpart = function () {
                    botui.message.bot({
                        delay: 1E3,
                        content: "挣钱~"
                    }).then(function () {
                        botui.action.button({
                            delay: 1500,
                            action: [{
                                text: "除了这个？ 😒",
                                value: "why-cat"
                            }]
                        }).then(function (a) {
                            fourthpart()
                        })
                    })
                },
                fourthpart = function () {
                    botui.message.bot({
                        delay: 1E3,
                        content: "泡健身房撸铁 "
                    }).then(function () {
                        botui.message.bot({
                            delay: 1100,
                            content: "写写字弹弹吉他啥的！"
                        }).then(function () {
                            botui.action.button({
                                delay: 1500,
                                action: [{
                                    text: "为什么喜欢这些呢？",
                                    value: "why-domain"
                                }]
                            }).then(function (a) {
                                fifthpart()
                            })
                        })
                    })
                },
                fifthpart = function () {
                    botui.message.bot({
                        delay: 1E3,
                        content: "为了成为更好的自己！💪💪💪"
                    }).then(function () {
                        botui.message.bot({
                            delay: 1600,
                            content: "我先上图为敬！"
                        }).then(function () {
                            botui.message.bot({
                                delay: 600,
                                content: "![...](https://cdn.jsdelivr.net/gh/dxc0522/cdn_assets@3.7/img/custom/this_is_me.jpg)"
                            })
                        })
                    })
                }
        }
    })
}
document.addEventListener('pjax:complete', function () {
    loadingPage('complete')
})
document.addEventListener('DOMContentLoaded', function () {
    loadingPage('DOMContentLoaded')
})