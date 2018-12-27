var Env = require('env');
var Mock = require('mockjs');
var MockData = {
    mock: function () {
        Mock.mock(new RegExp("^.*/v1/surveys/testing/60GMSL7eBgFo/answer"), {
            "code": 0,
            "message": "string",
            "data": {
                "id": 642,
                "code": "60GMSL7eBgFo",
                "user_id": 100303,
                "plan_id": 35,
                "activity_id": 12,
                "plan_index": 0,
                "score": 2,
                "power": 1,
                "ko": 0,
                "ranking": 0,
                "average": "0.00",
                "used_time": 20,
                "answer_time": "2018-06-30 14:26:34",
                "report_image": "",
                "area": "",
                "evaluation": "",
                "suggestion": "",
                "ranks": null,
                "status": 2,
                "right_count": 2,
                "is_new_record": 0,
                "plan": {
                    "id": 35,
                    "name": "\u5934\u8111\u8bad\u7ec3"
                }
            }
        });
        Mock.mock(new RegExp("^.*/v1/surveys/ranking/minduser"), {
            "code": 0,
            "message": "string",
            "data": {
                "ranking": 46,
                "user_id": 100303,
                "name": "bao",
                "avatar": null,
                "used_time": 120,
                "right_count": 3,
                "answer_time": "2018-06-30 11:34:26",
                "total_time": "140",
                "gap": 10
            }
        });
        Mock.mock(new RegExp("^.*/v1/surveys/ranking/week"), {
            "code": 0,
            "message": "string",
            "data": [{
                "user_id": 419,
                "score": 3,
                "used_time": 11,
                "answer_time": "2018-07-07 22:51:36",
                "user": {
                    "user_id": 419,
                    "name": null,
                    "avatar": null
                }
            }, {
                "user_id": 400,
                "score": 3,
                "used_time": 14,
                "answer_time": "2018-07-05 06:35:41",
                "user": {
                    "user_id": 400,
                    "name": null,
                    "avatar": null
                }
            }, {
                "user_id": 219,
                "score": 3,
                "used_time": 15,
                "answer_time": "2018-07-03 05:05:18",
                "user": {
                    "user_id": 219,
                    "name": null,
                    "avatar": null
                }
            }, {
                "user_id": 184,
                "score": 3,
                "used_time": 17,
                "answer_time": "2018-07-03 10:27:50",
                "user": {
                    "user_id": 184,
                    "name": null,
                    "avatar": null
                }
            }, {
                "user_id": 110,
                "score": 3,
                "used_time": 19,
                "answer_time": "2018-07-03 16:43:10",
                "user": {
                    "user_id": 110,
                    "name": null,
                    "avatar": null
                }
            }, {
                "user_id": 156,
                "score": 3,
                "used_time": 19,
                "answer_time": "2018-07-07 02:26:29",
                "user": {
                    "user_id": 156,
                    "name": null,
                    "avatar": null
                }
            }, {
                "user_id": 129,
                "score": 3,
                "used_time": 20,
                "answer_time": "2018-07-03 02:08:25",
                "user": {
                    "user_id": 129,
                    "name": null,
                    "avatar": null
                }
            }, {
                "user_id": 103,
                "score": 3,
                "used_time": 20,
                "answer_time": "2018-07-07 06:55:59",
                "user": {
                    "user_id": 103,
                    "name": null,
                    "avatar": null
                }
            }, {
                "user_id": 381,
                "score": 3,
                "used_time": 20,
                "answer_time": "2018-07-07 18:20:30",
                "user": {
                    "user_id": 381,
                    "name": null,
                    "avatar": null
                }
            }, {
                "user_id": 234,
                "score": 3,
                "used_time": 24,
                "answer_time": "2018-07-02 18:01:16",
                "user": {
                    "user_id": 234,
                    "name": null,
                    "avatar": null
                }
            }]
        });
        Mock.mock(new RegExp("^.*/v1/surveys/ranking/hardworking"), {
            "code": 0,
            "message": "string",
            "data": [{
                "user_id": 333,
                "answer_time": "2018-07-07 03:40:07",
                "total_time": "307",
                "user": {
                    "user_id": 333,
                    "name": null,
                    "avatar": null
                }
            }, {
                "user_id": 159,
                "answer_time": "2018-07-07 17:42:13",
                "total_time": "282",
                "user": {
                    "user_id": 159,
                    "name": null,
                    "avatar": null
                }
            }, {
                "user_id": 163,
                "answer_time": "2018-07-04 20:38:34",
                "total_time": "233",
                "user": {
                    "user_id": 163,
                    "name": null,
                    "avatar": null
                }
            }, {
                "user_id": 107,
                "answer_time": "2018-07-05 08:47:40",
                "total_time": "229",
                "user": {
                    "user_id": 107,
                    "name": null,
                    "avatar": null
                }
            }, {
                "user_id": 237,
                "answer_time": "2018-07-04 21:20:13",
                "total_time": "224",
                "user": {
                    "user_id": 237,
                    "name": null,
                    "avatar": null
                }
            }, {
                "user_id": 242,
                "answer_time": "2018-07-07 07:31:32",
                "total_time": "186",
                "user": {
                    "user_id": 242,
                    "name": null,
                    "avatar": null
                }
            }, {
                "user_id": 135,
                "answer_time": "2018-07-07 19:23:27",
                "total_time": "186",
                "user": {
                    "user_id": 135,
                    "name": null,
                    "avatar": null
                }
            }, {
                "user_id": 126,
                "answer_time": "2018-07-05 19:01:50",
                "total_time": "179",
                "user": {
                    "user_id": 126,
                    "name": null,
                    "avatar": null
                }
            }, {
                "user_id": 399,
                "answer_time": "2018-07-06 01:59:53",
                "total_time": "177",
                "user": {
                    "user_id": 399,
                    "name": null,
                    "avatar": null
                }
            }, {
                "user_id": 189,
                "answer_time": "2018-07-04 11:35:43",
                "total_time": "165",
                "user": {
                    "user_id": 189,
                    "name": null,
                    "avatar": null
                }
            }]
        });

        Mock.mock(new RegExp("^.*/v1/surveys/activities/12/plans/35/testing"), {
            "code": 0,
            "message": "string",
            "data": {
                "code": "60GMSL7eBgFo",
                "status": 2,
                "count": 2,
                "questions": [{
                    "id": 2356,
                    "type": 1,
                    "title": "\u5934\u8111\u8bad\u7ec3\u9898\u76ee1",
                    "image": "",
                    "brief": "",
                    "limit_type": 2,
                    "limit_time": 0,
                    "answer": "8064",
                    "right_rate": 0,
                    "required": 1,
                    "status": 2,
                    "options": [{
                        "id": 8063,
                        "name": "对",
                        "score": 1
                    }, {
                        "id": 8064,
                        "name": "错",
                        "score": 0
                    }]
                }, {
                    "id": 2357,
                    "type": 1,
                    "title": "\u5934\u8111\u8bad\u7ec3\u9898\u76ee2",
                    "image": "",
                    "brief": "",
                    "limit_type": 2,
                    "limit_time": 0,
                    "answer": "8065",
                    "right_rate": 0,
                    "required": 1,
                    "status": 2,
                    "options": [{
                        "id": 8065,
                        "name": "对",
                        "score": 1
                    }, {
                        "id": 8066,
                        "name": "错",
                        "score": 0
                    }]
                }, {
                    "id": 2358,
                    "type": 1,
                    "title": "\u5934\u8111\u8bad\u7ec3\u9898\u76ee3",
                    "image": "",
                    "brief": "",
                    "limit_type": 2,
                    "limit_time": 0,
                    "answer": "8067",
                    "right_rate": 0,
                    "required": 1,
                    "status": 2,
                    "options": [{
                        "id": 8067,
                        "name": "对",
                        "score": 1
                    }, {
                        "id": 8068,
                        "name": "错",
                        "score": 0
                    }]
                }],
                "activity": {
                    "id": 12,
                    "title": "\u5934\u8111\u8bad\u7ec3",
                    "image": "",
                    "description": "<p>\u5934\u8111\u8bad\u7ec3<\/p>"
                }
            }
        });
        Mock.mock(new RegExp("^.*/v1/surveys/snapshoots"), {
            "code": 0,
            "message": "string",
            "data": {
                // "url": "http://activity.huijiame.com/593fac2f3a1a0OOPpTBtM7Q.jpg?imageView2/1/w/750/interlace/1"
                "url": "http://surveytest.cn-bj.ufileos.com/snapshoot_f192c0ebd12308f4033475f4d0e8fcbe.jpeg?UCloudPublicKey=QZ9h0R5UUuDaHKhZ70VT3UPYoHPQrKB2KNf0jhhzdxJLqZex&Signature=mcPNmYDQr8xexp0ulki3qGULYGk%3D&Expires=1504771257"
            }
        });
        Mock.mock(new RegExp("^.*v1/surveys/testing/[\\d]+.*/detail"), {
            "code": 0,
            "message": "string",
            "data": {
                "id": 0,
                "code": "string",
                "name": "string",
                "score": 0,
                "ko": 0,
                "average": 0,
                "ranking": 0,
                "suggestion": "string",
                "evaluation": "string",
                "status": 0,
                "categories": [{
                    "category_id": 0,
                    "name": "逻辑",
                    "rate": 60,
                    "more": 20
                }, {
                    "category_id": 0,
                    "name": "直觉",
                    "rate": 70,
                    "more": 10
                }, {
                    "category_id": 0,
                    "name": "逆向",
                    "rate": 80,
                    "more": 5
                }, {
                    "category_id": 0,
                    "name": "发散",
                    "rate": 90,
                    "more": 2
                }, {
                    "category_id": 0,
                    "name": "形象",
                    "rate": 85,
                    "more": 8
                }],
                "scorings": [{
                    "id": 0,
                    "rule_type": 0,
                    "rule_value": "string",
                    "category": {
                        "id": 0,
                        "name": "string"
                    },
                    "ad": {
                        "id": 0,
                        "name": "string",
                        "image": "string",
                        "url": "string"
                    },
                    "evaluation": {
                        "id": 0,
                        "content": "string"
                    }
                }]
            }
        });
        Mock.mock(new RegExp("^.*v1/surveys/helpers/1"), {
            "code": 0,
            "message": "string",
            "data": [{
                "user_id": 0,
                "name": "string",
                "avatar": "string",
                "created_at": "2010-10-10"
            }],
            "cursor": "string"
        });
        Mock.mock(new RegExp("^.*v1/surveys/ranking/province"), {
            "code": 0,
            "message": "string",
            "data": [{
                "id": 1,
                "province": "山东"
            }, {
                "id": 2,
                "province": "上海"
            }, {
                "id": 3,
                "province": "北京"
            }]
        });
        Mock.mock(new RegExp("^.*v1/surveys/ranking/schedule"), {
            "code": 0,
            "message": "string",
            "data": [{
                "id": 1,
                "name": "3-6岁"
            }, {
                "id": 2,
                "name": "7-10岁"
            }, {
                "id": 3,
                "name": "11-16岁"
            }]
        });
        Mock.mock(new RegExp("^.*v1/surveys/ranking/areas"), {
            "code": 0,
            "message": "string",
            "data": [{
                "id": 0,
                "name": "刘德华",
                "avatar": "string",
                "score": 1,
                "province": "string",
                "ranking": 4,
                "age": 0,
                "power": 10
            }, {
                "id": 1,
                "name": "刘德华1",
                "avatar": "string",
                "score": 2,
                "province": "string",
                "ranking": 5,
                "age": 0,
                "power": 10
            }, {
                "id": 0,
                "name": "刘德华2",
                "avatar": "string",
                "score": 3,
                "province": "string",
                "ranking": 6,
                "age": 0,
                "power": 10
            }, {
                "id": 0,
                "name": "刘德华2",
                "avatar": "string",
                "score": 3,
                "province": "string",
                "ranking": 6,
                "age": 0,
                "power": 10
            }],
            "user": {
                "id": 0,
                "name": "string",
                "avatar": "string",
                "power": 0,
                "ranking": 0,
                "province": "上海",
                "schedule": {
                    "plan_index": 1,
                    "name": "string"
                },
                "age": 0
            }

        });
        Mock.mock(new RegExp("^.*v1/surveys/testing/[\\d]+.*/answer"), {
            "code": 0,
            "message": "string",
            "data": {
                "id": 0,
                "code": "string",
                "name": "string",
                "score": 0,
                "ko": 0,
                "average": 0,
                "ranking": 0,
                "suggestion": "string",
                "evaluation": "string",
                "status": 0,
                "categories": [
                    [{
                        "category_id": 0,
                        "name": "string",
                        "rate": 0,
                        "more": 0
                    }]
                ],
                "scorings": [{
                    "id": 0,
                    "rule_type": 0,
                    "rule_value": "string",
                    "category": {
                        "id": 0,
                        "name": "string"
                    },
                    "ad": {
                        "id": 0,
                        "name": "string",
                        "image": "string",
                        "url": "string"
                    },
                    "evaluation": {
                        "id": 0,
                        "content": "string"
                    }
                }]
            }
        });
        Mock.mock(new RegExp("^.*v1/surveys/activities/[\\d]+.*/testing"), {
            "code": 0,
            "message": "string",
            "data": {
                "code": "123",
                "questions": [{
                    "id": 0,
                    "type": 0,
                    "title": "问题1",
                    // "image": "http://activity.huijiame.com/593fac2f3a1a0OOPpTBtM7Q.jpg?imageView2/1/w/750/interlace/1",
                    "image": "",
                    "brief": "请选择正确答案",
                    "options": [{
                        "id": 2,
                        "name": "http://activity.huijiame.com/593fac2f3a1a0OOPpTBtM7Q.jpg?imageView2/1/w/750/interlace/1",
                        "score": 0
                    }, {
                        "id": 2,
                        "name": "http://activity.huijiame.com/593fac2f3a1a0OOPpTBtM7Q.jpg?imageView2/1/w/750/interlace/1",
                        "score": 1
                    }, {
                        "id": 2,
                        "name": "http://activity.huijiame.com/593fac2f3a1a0OOPpTBtM7Q.jpg?imageView2/1/w/750/interlace/1",
                        "score": 2
                    }, {
                        "id": 2,
                        "name": "http://activity.huijiame.com/593fac2f3a1a0OOPpTBtM7Q.jpg?imageView2/1/w/750/interlace/1",
                        "score": 3
                    }],
                    "answer": "string",
                    "status": 0,
                    "required": 0
                }, {
                    "id": 1,
                    "type": 0,
                    "title": "问题2",
                    "image": "http://activity.huijiame.com/593fac2f3a1a0OOPpTBtM7Q.jpg?imageView2/1/w/750/interlace/1",
                    "brief": "请选择正确答案2",
                    "options": [{
                        "id": 2,
                        "name": "选项1",
                        "score": 0
                    }, {
                        "id": 2,
                        "name": "选项2",
                        "score": 1
                    }, {
                        "id": 2,
                        "name": "选项3",
                        "score": 2
                    }, {
                        "id": 2,
                        "name": "选项4",
                        "score": 3
                    }],
                    "answer": "string",
                    "status": 0,
                    "required": 0
                }, {
                    "id": 0,
                    "type": 0,
                    "title": "问题1",
                    // "image": "http://activity.huijiame.com/593fac2f3a1a0OOPpTBtM7Q.jpg?imageView2/1/w/750/interlace/1",
                    "image": "",
                    "brief": "请选择正确答案",
                    "options": [{
                        "id": 2,
                        "name": "选项1",
                        "score": 0
                    }, {
                        "id": 2,
                        "name": "选项2",
                        "score": 1
                    }, {
                        "id": 2,
                        "name": "选项3",
                        "score": 2
                    }, {
                        "id": 2,
                        "name": "选项4",
                        "score": 3
                    }],
                    "answer": "string",
                    "status": 0,
                    "required": 0
                }, {
                    "id": 0,
                    "type": 0,
                    "title": "问题1",
                    // "image": "http://activity.huijiame.com/593fac2f3a1a0OOPpTBtM7Q.jpg?imageView2/1/w/750/interlace/1",
                    "image": "",
                    "brief": "请选择正确答案",
                    "options": [{
                        "id": 2,
                        "name": "选项1",
                        "score": 0
                    }, {
                        "id": 2,
                        "name": "选项2",
                        "score": 1
                    }, {
                        "id": 2,
                        "name": "选项3",
                        "score": 2
                    }, {
                        "id": 2,
                        "name": "选项4",
                        "score": 3
                    }],
                    "answer": "string",
                    "status": 0,
                    "required": 0
                }, {
                    "id": 0,
                    "type": 0,
                    "title": "问题1",
                    // "image": "http://activity.huijiame.com/593fac2f3a1a0OOPpTBtM7Q.jpg?imageView2/1/w/750/interlace/1",
                    "image": "",
                    "brief": "请选择正确答案",
                    "options": [{
                        "id": 2,
                        "name": "选项1",
                        "score": 0
                    }, {
                        "id": 2,
                        "name": "选项2",
                        "score": 1
                    }, {
                        "id": 2,
                        "name": "选项3",
                        "score": 2
                    }, {
                        "id": 2,
                        "name": "选项4",
                        "score": 3
                    }],
                    "answer": "string",
                    "status": 0,
                    "required": 0
                }]
            }
        });
        Mock.mock(new RegExp("^.*v1/surveys/ranking/friends"), {
            "code": 0,
            "message": "string",
            "data": [{
                "id": 0,
                "name": "string",
                "avatar": "string",
                "age": 0,
                "power": 0
            }, {
                "id": 0,
                "name": "string",
                "avatar": "string",
                "age": 0,
                "power": 0
            }, {
                "id": 0,
                "name": "string",
                "avatar": "string",
                "age": 0,
                "power": 0
            }, {
                "id": 0,
                "name": "string",
                "avatar": "string",
                "age": 0,
                "power": 0
            }],
            "user": {
                "id": 0,
                "name": "string",
                "avatar": "string",
                "power": 0,
                "ranking": 0,
                "age": 0
            },
            "cursor": ""
        });
        Mock.mock(new RegExp("^.*v1/surveys/ranking/share"), {
            "code": 0,
            "message": "string",
            "data": [{
                "id": 0,
                "name": "string",
                "avatar": "string",
                "count": 0
            }],
            "user": {
                "id": 0,
                "name": "string",
                "avatar": "string",
                "ranking": 0,
                "count": 0
            },
            "cursor": ""
        });
        Mock.mock(new RegExp("^.*v1/surveys/activities/[\\d]+.*/attachments"), {
            "code": 0,
            "message": "string",
            "data": {
                "limit_time": 500
            }
        });
        Mock.mock(new RegExp("^.*v1/surveys/activities/[\\d]+.*/check"), {
            "code": 0,
            "message": "string",
            "data": {
                "status": 1
            }
        });
        Mock.mock(new RegExp("^.*v1/surveys/users/[\\d]+.*"), {
            "code": 0,
            "message": "string",
            "data": {
                "avatar": "",
                "name": "刘德华",
                "user_id": 1
            }
        });
        Mock.mock(new RegExp("^.*v1/surveys/activities/[\\d]+."), {
            "code": 0,
            "message": "string",
            "data": {
                "id": 0,
                "title": "string",
                "image": "http://activity.huijiame.com/593fac2f3a1a0OOPpTBtM7Q.jpg",
                "description": "我喜欢用曹操我喜欢用曹操我喜欢用曹操我喜欢用曹操我喜欢用曹操我喜欢用曹操我喜欢用曹操",
                "plan": {
                    "limit_time": 50
                },
                "attachments": [{
                    "id": 1,
                    "type": 4,
                    "title": "你叫么名字？",
                    "category": "name",
                    "options": []
                }, {
                    "id": 2,
                    "type": 4,
                    "title": "请输入你的生日，例如：20170707",
                    "category": "age",
                    "options": []
                }, {
                    "id": 3,
                    "type": 4,
                    "title": "请选择一下省份",
                    "category": "province",
                    "options": []
                }]
            }
        });
        Mock.mock(new RegExp("^.*v1/surveys/testing/1/screen"), {
            "code": 0,
            "message": "string",
            "data": {
                "code": "string",
                "url": "https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=1591258152,2683169908&fm=27&gp=0.jpg"
            }
        });
    }
}

MockData.mock();
window.BASE_INFO = {

}
window.INIT_DATA = {
    ahaqa: {
        "code": 0,
        "message": "string",
        "data": {
            "code": "1",
            "status": 2,
            "activity": {
                "id": 0,
                "title": "string",
                "image": "string",
                "description": "1<br>2<br>3",
                "plan": {
                    "plan_index": 0,
                    "limit_time": 0
                },
                "attachments": [{
                    "id": 0,
                    "type": 0,
                    "title": "string",
                    "category": "string",
                    "options": [{
                        "id": 0,
                        "name": "string"
                    }]
                }]
            },
            "questions": [{
                "id": 0,
                "type": 0,
                "title": "1.我到底该使用什么英雄才能把王者上喽？",
                "image": "string",
                "voice": "string",
                "voice_time": 0,
                "voice_duration": 0,
                "limit_type": 0,
                "limit_time": 0,
                "brief": "string",
                "options": [{
                    "id": 1,
                    "name": "A.蔡文姬",
                    "score": 0
                }, {
                    "id": 2,
                    "name": "B.安琪拉",
                    "score": 2
                }, {
                    "id": 3,
                    "name": "C.典韦",
                    "score": 0
                }, {
                    "id": 4,
                    "name": "D.曹操",
                    "score": 0
                }],
                // "answer": "1",
                "status": 2,
                "required": 0
            }, {
                "id": 0,
                "type": 0,
                "title": "3.我到底该使用什么英雄才能把王者上喽？",
                "image": "string",
                "voice": "string",
                "voice_time": 0,
                "voice_duration": 0,
                "limit_type": 0,
                "limit_time": 0,
                "brief": "string",
                "options": [{
                    "id": 1,
                    "name": "A.蔡文姬",
                    "score": 0
                }, {
                    "id": 2,
                    "name": "B.安琪拉",
                    "score": 0
                }, {
                    "id": 3,
                    "name": "C.典韦",
                    "score": 1
                }, {
                    "id": 4,
                    "name": "D.曹操",
                    "score": 0
                }],
                // "answer": "3",
                "status": 1,
                "required": 0
            }
                // , {
                //     "id": 0,
                //     "type": 0,
                //     "title": "3.我到底该使用什么英雄才能把王者上喽？",
                //     "image": "string",
                //     "voice": "string",
                //     "voice_time": 0,
                //     "voice_duration": 0,
                //     "limit_type": 0,
                //     "limit_time": 0,
                //     "brief": "string",
                //     "options": [{
                //         "id": 1,
                //         "name": "A.蔡文姬",
                //         "score": 0
                //     }, {
                //         "id": 2,
                //         "name": "B.安琪拉",
                //         "score": 0
                //     }, {
                //         "id": 3,
                //         "name": "C.典韦",
                //         "score": 0
                //     }, {
                //         "id": 4,
                //         "name": "D.曹操",
                //         "score": 0
                //     }],
                //     "answer": "4",
                //     "status": 0,
                //     "required": 0
                // }
                // , {
                //     "id": 0,
                //     "type": 0,
                //     "title": "3.我到底该使用什么英雄才能把王者上喽？",
                //     "image": "string",
                //     "voice": "string",
                //     "voice_time": 0,
                //     "voice_duration": 0,
                //     "limit_type": 0,
                //     "limit_time": 0,
                //     "brief": "string",
                //     "options": [{
                //         "id": 1,
                //         "name": "A.蔡文姬",
                //         "score": 0
                //     }, {
                //         "id": 2,
                //         "name": "B.安琪拉",
                //         "score": 0
                //     }, {
                //         "id": 3,
                //         "name": "C.典韦",
                //         "score": 0
                //     }, {
                //         "id": 4,
                //         "name": "D.曹操",
                //         "score": 0
                //     }],
                //     "answer": "4",
                //     "status": 0,
                //     "required": 0
                // }, {
                //     "id": 0,
                //     "type": 0,
                //     "title": "3.我到底该使用什么英雄才能把王者上喽？",
                //     "image": "string",
                //     "voice": "string",
                //     "voice_time": 0,
                //     "voice_duration": 0,
                //     "limit_type": 0,
                //     "limit_time": 0,
                //     "brief": "string",
                //     "options": [{
                //         "id": 1,
                //         "name": "A.蔡文姬",
                //         "score": 0
                //     }, {
                //         "id": 2,
                //         "name": "B.安琪拉",
                //         "score": 0
                //     }, {
                //         "id": 3,
                //         "name": "C.典韦",
                //         "score": 0
                //     }, {
                //         "id": 4,
                //         "name": "D.曹操",
                //         "score": 4
                //     }],
                //     "answer": "4",
                //     "status": 1,
                //     "required": 0
                // }, {
                //     "id": 0,
                //     "type": 0,
                //     "title": "3.我到底该使用什么英雄才能把王者上喽？",
                //     "image": "string",
                //     "voice": "string",
                //     "voice_time": 0,
                //     "voice_duration": 0,
                //     "limit_type": 0,
                //     "limit_time": 0,
                //     "brief": "string",
                //     "options": [{
                //         "id": 1,
                //         "name": "A.蔡文姬",
                //         "score": 0
                //     }, {
                //         "id": 2,
                //         "name": "B.安琪拉",
                //         "score": 0
                //     }, {
                //         "id": 3,
                //         "name": "C.典韦",
                //         "score": 0
                //     }, {
                //         "id": 4,
                //         "name": "D.曹操",
                //         "score": 0
                //     }],
                //     "answer": "4",
                //     "status": 0,
                //     "required": 0
                // }
                // , {
                //     "id": 0,
                //     "type": 0,
                //     "title": "3.我到底该使用什么英雄才能把王者上喽？",
                //     "image": "string",
                //     "voice": "string",
                //     "voice_time": 0,
                //     "voice_duration": 0,
                //     "limit_type": 0,
                //     "limit_time": 0,
                //     "brief": "string",
                //     "options": [{
                //         "id": 1,
                //         "name": "A.蔡文姬",
                //         "score": 0
                //     }, {
                //         "id": 2,
                //         "name": "B.安琪拉",
                //         "score": 0
                //     }, {
                //         "id": 3,
                //         "name": "C.典韦",
                //         "score": 0
                //     }, {
                //         "id": 4,
                //         "name": "D.曹操",
                //         "score": 0
                //     }],
                //     "answer": "4",
                //     "status": 0,
                //     "required": 0
                // }, {
                //     "id": 0,
                //     "type": 0,
                //     "title": "3.我到底该使用什么英雄才能把王者上喽？",
                //     "image": "string",
                //     "voice": "string",
                //     "voice_time": 0,
                //     "voice_duration": 0,
                //     "limit_type": 0,
                //     "limit_time": 0,
                //     "brief": "string",
                //     "options": [{
                //         "id": 1,
                //         "name": "A.蔡文姬",
                //         "score": 0
                //     }, {
                //         "id": 2,
                //         "name": "B.安琪拉",
                //         "score": 0
                //     }, {
                //         "id": 3,
                //         "name": "C.典韦",
                //         "score": 0
                //     }, {
                //         "id": 4,
                //         "name": "D.曹操",
                //         "score": 0
                //     }],
                //     "answer": "4",
                //     "status": 0,
                //     "required": 0
                // }, {
                //     "id": 0,
                //     "type": 0,
                //     "title": "3.我到底该使用什么英雄才能把王者上喽？",
                //     "image": "string",
                //     "voice": "string",
                //     "voice_time": 0,
                //     "voice_duration": 0,
                //     "limit_type": 0,
                //     "limit_time": 0,
                //     "brief": "string",
                //     "options": [{
                //         "id": 1,
                //         "name": "A.蔡文姬",
                //         "score": 0
                //     }, {
                //         "id": 2,
                //         "name": "B.安琪拉",
                //         "score": 0
                //     }, {
                //         "id": 3,
                //         "name": "C.典韦",
                //         "score": 0
                //     }, {
                //         "id": 4,
                //         "name": "D.曹操",
                //         "score": 0
                //     }],
                //     "answer": "4",
                //     "status": 0,
                //     "required": 0
                // }, {
                //     "id": 0,
                //     "type": 0,
                //     "title": "3.我到底该使用什么英雄才能把王者上喽？",
                //     "image": "string",
                //     "voice": "string",
                //     "voice_time": 0,
                //     "voice_duration": 0,
                //     "limit_type": 0,
                //     "limit_time": 0,
                //     "brief": "string",
                //     "options": [{
                //         "id": 1,
                //         "name": "A.蔡文姬",
                //         "score": 0
                //     }, {
                //         "id": 2,
                //         "name": "B.安琪拉",
                //         "score": 0
                //     }, {
                //         "id": 3,
                //         "name": "C.典韦",
                //         "score": 0
                //     }, {
                //         "id": 4,
                //         "name": "D.曹操",
                //         "score": 0
                //     }],
                //     "answer": "4",
                //     "status": 0,
                //     "required": 0
                // }, {
                //     "id": 0,
                //     "type": 0,
                //     "title": "2.我到底该使用什么英雄才能把王者上喽？",
                //     "image": "string",
                //     "voice": "string",
                //     "voice_time": 0,
                //     "voice_duration": 0,
                //     "limit_type": 0,
                //     "limit_time": 0,
                //     "brief": "string",
                //     "options": [{
                //         "id": 1,
                //         "name": "A.蔡文姬",
                //         "score": 0
                //     }, {
                //         "id": 2,
                //         "name": "B.安琪拉",
                //         "score": 0
                //     }, {
                //         "id": 3,
                //         "name": "C.典韦",
                //         "score": 0
                //     }, {
                //         "id": 4,
                //         "name": "D.曹操",
                //         "score": 0
                //     }],
                //     "answer": "2",
                //     "status": 1,
                //     "required": 0
                // }
            ]
        }
    },
    isself: false,
    ishelped: 0,
    subscribe: {
        "code": 0,
        "message": "string",
        "data": {
            "subscribe": 0
        }
    },
    helpeseeker: {
        "code": 0,
        "message": "string",
        "data": {
            "user_id": 0,
            "name": "string",
            "avatar": "string"
        }
    },
    rankuser: {
        "code": 0,
        "message": "string",
        "data": {
            "province": "上海",
            "plan_index": "1",
            "plan": "string"
        }
    },
    userinfo: {
        "code": 0,
        "message": "string",
        "data": {
            "user_id": 0,
            "name": "彭于晏眼",
            "avatar": "http://resource.huijiame.com/59798506344566HubwAVvP1.jpg"
        }
    },
    detail: {
        "code": 0,
        "message": "string",
        "data": {
            "id": 0,
            "code": "string",
            "name": "string",
            "score": 0,
            "ko": 50,
            "average": 0,
            "ranking": 0,
            "suggestion": null,
            "evaluation": "解锁了xxxx形象技能",
            "activity_id": 0,
            "plan_id": 0,
            "plan_index": 1,
            "plan": {
                "id": 0,
                "name": "0-6"
            },
            "status": 0,
            "categories": [{
                "category_id": 0,
                "name": "逻辑",
                "rate": 60,
                "more": 20
            }, {
                "category_id": 0,
                "name": "直觉",
                "rate": 70,
                "more": 10
            }, {
                "category_id": 0,
                "name": "逆向",
                "rate": 80,
                "more": 5
            }, {
                "category_id": 0,
                "name": "发散",
                "rate": 90,
                "more": 2
            }, {
                "category_id": 0,
                "name": "形象",
                "rate": 85,
                "more": 8
            }],
            "scorings": [{
                "id": 0,
                "rule_type": 0,
                "rule_value": "string",
                "category": {
                    "id": 0,
                    "name": "string"
                },
                "ad": {
                    "id": 0,
                    "name": "string",
                    "image": "string",
                    "url": "string"
                },
                "evaluation": {
                    "id": 0,
                    "content": "很好很好很好很好很好很好"
                }
            }],
            "user": {
                "name": "string",
                "avatar": "string"
            },
            "attachment": {
                "name": "zhangsan",
                "age": "12",
                "province": "string"
            }
        }
    },
    report: {
        "code": 0,
        "message": "string",
        "data": {
            "id": 0,
            "code": "string",
            "name": "string",
            "score": 0,
            "ko": 0,
            "average": 0,
            "ranking": 0,
            "suggestion": "string",
            "evaluation": "",
            "activity_id": 0,
            "plan_id": 0,
            "status": 0,
            "categories": [{
                "category_id": 0,
                "name": "逻辑",
                "rate": 60,
                "more": 20
            }, {
                "category_id": 0,
                "name": "直觉",
                "rate": 70,
                "more": 10
            }, {
                "category_id": 0,
                "name": "逆向",
                "rate": 80,
                "more": 5
            }, {
                "category_id": 0,
                "name": "发散",
                "rate": 90,
                "more": 2
            }, {
                "category_id": 0,
                "name": "形象",
                "rate": 85,
                "more": 8
            }],
            "scorings": [{
                "id": 0,
                "rule_type": 0,
                "rule_value": "string",
                "category": {
                    "id": 0,
                    "name": "string"
                },
                "ad": {
                    "id": 0,
                    "name": "string",
                    "image": "string",
                    "url": "string"
                },
                "evaluation": {
                    "id": 0,
                    "content": "很好很好很好很好很好很好"
                }
            }],
            "user": {
                "name": "string",
                "avatar": "string"
            },
            "attachment": {
                "name": "string",
                "age": "string",
                "province": "string"
            }
        }
    },
    activity: {
        "code": 0,
        "message": "string",
        "data": {
            "id": 5,
            "title": "2017少儿天赋发现大奖赛",
            "image": "http://activity.huijiame.com/598966c59d867jHFzSdHeT4.jpg",
            "description": "<style type='text/css'>p.p1{margin:0.0px 0.0px 0.0px 0.0px;line-height:19.0px;font:14.0px'Helvetica Neue'}span.s1{font:13.0px'Helvetica Neue'}</style><p class='p1'>每个人都有自己独一无二的天赋<span class='s1'>，</span>你的天赋在哪里呢<span class='s1'>？</span></p><p class='p1'>我来解码你的天赋优势<span class='s1'>！</span></p><p class='p1'>一定要在规定时间里独立完成任务哦<span class='s1'>~</span></p><p><br/></p>",
            "plan": {
                "limit_time": 500
            },
            "attachments": [{
                "id": 1,
                "type": 4,
                "title": "你叫么名字？",
                "category": "name",
                "options": []
            }, {
                "id": 2,
                "type": 4,
                "title": "请输入你的生日，例如：20170707",
                "category": "age",
                "options": []
            }, {
                "id": 3,
                "type": 4,
                "title": "请选择一下省份",
                "category": "province",
                "options": []
            }]
        }
    },
    footmark: {
        "code": 0,
        "message": "string",
        "data": [{
            "id": 0,
            "title": "string",
            "image": "string",
            "answer": "string",
            "options": [{
                "id": 0,
                "name": "string",
                "score": 0
            }]
        }]
    },
    footmark_error: {
        "code": 0,
        "message": "string",
        "user": {
            "user_id": 1,
            "avatar": ""
        },
        "data": [{
            "id": 0,
            "title": "杜甫《望月》:“岱宗夫如何,齐鲁青未了”中的“岱宗”指的是?",
            // "image": "http://resource.huijiame.com/599cedcf44936XFmGH8j7tX.png",
            "image": "",
            "answer": "2",
            "brief": "dasdasdasdas",
            "options": [{
                "id": 1,
                "name": "华山华山华山山华山华山华山",
                "score": 4
            }, {
                "id": 2,
                "name": "http://activity.huijiame.com/593fac2f3a1a0OOPpTBtM7Q.jpg?imageView2/1/w/750/interlace/1",
                "score": 0
            }, {
                "id": 3,
                "name": "http://activity.huijiame.com/593fac2f3a1a0OOPpTBtM7Q.jpg?imageView2/1/w/750/interlace/1",
                // "name": "泰山",
                "score": 0
            }, {
                "id": 4,
                "name": "嵩山",
                "score": 0
            }]
        }]
    },
    wiseDetail: {
        "code": 0,
        "message": "detailString",
        "data": {
            "id": 0,
            "user_id": 0,
            "code": "1",
            "name": "string",
            "score": 0,
            "ko": 10,
            "average": 0,
            "ranking": 0,
            "suggestion": "string",
            "evaluation": "string",
            "activity_id": 0,
            "plan_id": 0,
            "report_image": "string",
            "status": 0,
            "categories": [
                {
                    "category_id": 0,
                    "name": "string",
                    "rate": 0,
                    "more": 0
                }
            ],
            "scorings": [
                {
                    "id": 0,
                    "rule_type": 0,
                    "rule_value": "string",
                    "category": {
                        "id": 0,
                        "name": "string"
                    },
                    "ad": {
                        "id": 0,
                        "name": "string",
                        "image": "string",
                        "url": "string"
                    },
                    "evaluation": {
                        "id": 0,
                        "content": "string"
                    }
                }
            ],
            "tags": [
                {
                    "id": 0,
                    "type": "wit_memory",
                    "rate": 100
                }
            ],
            "evaluations": [
                {
                    "id": 0,
                    "content": "<span style='font-size: 18px;'>评语时代峻峰速度快捷方式的font-size时代峻峰速度快捷方式的时代峻峰的时代峻峰速度快捷方式的度快捷方式的时代峻峰速度快捷方式的就是看到</span>"
                }
            ],
            "user": {
                "name": "大西瓜头",
                "avatar": "https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=410955806,4164577389&fm=27&gp=0.jpg"
            },
            "attachment": {
                "name": "string",
                "age": "string",
                "province": "string"
            }
        }
    },
    wisescreenpic: {
        "code": 0,
        "message": "string",
        "data": {
            "code": "string",
            "url": "https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=1591258152,2683169908&fm=27&gp=0.jpg"
        }
    },
    testing: {
        "code": 0,
        "message": "string",
        "data": {
            "code": "1",
            "status": 0,
            "activity": {
                "id": 0,
                "title": "string",
                "image": "string",
                "description": "string",
                "plan": {
                    "plan_index": 0,
                    "limit_time": 0
                },
                "attachments": [{
                    "id": 0,
                    "type": 0,
                    "title": "string",
                    "category": "string",
                    "options": [{
                        "id": 0,
                        "name": "string"
                    }]
                }]
            },
            "questions": [{
                "id": 0,
                "type": 0,
                "title": "string",
                "image": "http://activity.huijiame.com/59cc613838b44Dn5uLDIAwr.jpg?imageView2/2/w/750/interlace/1",
                "voice": "string",
                "voice_time": 0,
                "voice_duration": 0,
                "limit_type": 0,
                "limit_time": 0,
                "brief": "string",
                "right_rate": 0,
                "tags": [{
                    "id": 0,
                    "name": "a"
                }, {
                    "id": 0,
                    "name": "b"
                }],
                "materials": [{
                    "id": 0,
                    "url": "http://activity.huijiame.com/5a16992f64d087wPNQtjJzo.gif",
                    "type": 0,
                    "duration": 3
                }],
                "options": [{
                    "id": 0,
                    "name": "1",
                    "score": 1
                }, {
                    "id": 0,
                    "name": "2",
                    "score": 2
                }, {
                    "id": 0,
                    "name": "3",
                    "score": 3
                }, {
                    "id": 0,
                    "name": "4",
                    "score": 0
                }],
                "answer": "string",
                "status": 0,
                "required": 0
            }
                , {
                "id": 0,
                "type": 0,
                "title": "string",
                "image": "http://activity.huijiame.com/59cc613838b44Dn5uLDIAwr.jpg?imageView2/2/w/750/interlace/1",
                "voice": "string",
                "voice_time": 0,
                "voice_duration": 0,
                "limit_type": 0,
                "limit_time": 0,
                "brief": "string",
                "right_rate": 0,
                "tags": [{
                    "id": 0,
                    "name": "string"
                }],
                "materials": [{
                    "id": 0,
                    "url": "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1494673159880&di=2e8525061538327021756f8eef1c1823&imgtype=0&src=http%3A%2F%2Fimg.xiazaizhijia.com%2Fuploads%2F2016%2F0712%2F20160712104957592.gif",
                    "type": 0,
                    "duration": 3
                }],
                "options": [{
                    "id": 0,
                    "name": "1",
                    "score": 1
                }, {
                    "id": 0,
                    "name": "2",
                    "score": 2
                }, {
                    "id": 0,
                    "name": "3",
                    "score": 3
                }, {
                    "id": 0,
                    "name": "4",
                    "score": 0
                }],
                "answer": "string",
                "status": 0,
                "required": 0
            }, {
                "id": 0,
                "type": 0,
                "title": "string",
                "image": "http://activity.huijiame.com/59cc613838b44Dn5uLDIAwr.jpg?imageView2/2/w/750/interlace/1",
                "voice": "string",
                "voice_time": 0,
                "voice_duration": 0,
                "limit_type": 0,
                "limit_time": 0,
                "brief": "string",
                "right_rate": 0,
                "tags": [{
                    "id": 0,
                    "name": "string"
                }],
                // "materials": [{
                //     "id": 0,
                //     "url": "http://activity.huijiame.com/59cc613838b44Dn5uLDIAwr.jpg?imageView2/2/w/750/interlace/1",
                //     "type": 0,
                //     "duration": 3
                // }],
                "options": [{
                    "id": 0,
                    "name": "1",
                    "score": 1
                }, {
                    "id": 0,
                    "name": "2",
                    "score": 2
                }, {
                    "id": 0,
                    "name": "3",
                    "score": 3
                }, {
                    "id": 0,
                    "name": "4",
                    "score": 0
                }],
                "answer": "string",
                "status": 0,
                "required": 0
            }
            ]
        }
    }
}
// Util.log("已mock的数据" + JSON.stringify(Mock._mocked));
var user = {
    visitor_id: "visitor_id",
    auth_token: "auth_token",
    openid: "openid",
    user_id: 1
}
Util.setCookie("visitor_id", user.visitor_id);
Util.setCookie("auth_token", user.auth_token);
Util.setCookie("openid", user.openid);
Util.setCookie("user_id", user.user_id);
Util.log("已mock 的用户" + JSON.stringify(user));