---
layout: page
title: 留君言
meta:
  header: []
  footer: []
sidebar: []
---
<div class="toc-container">
  <div class="toc" style="background: none;">
  </div>
</div>
<div class="entry-content">
  <div class="poem-wrap">
    <div class="poem-border poem-left">
    </div>
    <div class="poem-border poem-right">
    </div>
    <h1>
    轻言两句</h1>
    <p id="poem">
    人生如梦，一樽还酹江月。</p>
    <p id="info">
    【宋代】苏轼《念奴娇·赤壁怀古》</p>
  </div>
</div>

{% p center,有什么想说的，有什么想问，就在下方留言吧，收到我会第一时间回复！请尽情灌水吧！😉 %}

<style>
.poem-wrap {
    position: relative;
    width: 730px;
    max-width: 80%;
    border: 2px solid #797979;
    border-top: 0;
    text-align: center;
    margin: 80px auto;
}

.poem-wrap h1 {
    position: relative;
    margin-top: -20px;
    display: inline-block;
    letter-spacing: 4px;
    color: #797979;
    border-bottom: none;
    font-weight:bold;
}
.poem-wrap h1:before{
    height:0;
}
.poem-wrap p {
    width: 70%;
    margin: auto;
    line-height: 30px;
    color: #797979;
}

.poem-wrap p#poem {
    text-align: center;
    font-size: 25px;
}

.poem-wrap p#info {
    text-align: center;
    font-size: 15px;
    margin: 15px auto;
}

.poem-border {
    position: absolute;
    height: 2px;
    width: 27%;
    background-color: #797979;
}

.poem-right {
    right: 0;
}

.poem-left {
    left: 0;
}

@media (max-width: 685px) {
    .poem-border {
        width: 18%;
    }
    .poem-wrap{
        width: 90%;
        max-width: 90%;
    }
    .poem-wrap h1 {
        font-size: 1.6em;
    }
    .poem-wrap h1::before {
        display: none;
    }
    .poem-wrap p {
        width: 85%;
    }
    .poem-wrap p#poem {
        font-size: 16px;
        font-weight: bold;
    }
    .poem-wrap p#info {
        font-size: 14px;
    }
}

@media (max-width: 500px) {
    .poem-wrap {
        margin-top: 60px;
        margin-bottom: 20px;
        border-top: 2px solid #797979;
    }

    .poem-wrap h1 {
        margin: 20px 6px;
    }

    .poem-border {
        display: none;
    }
}
</style>