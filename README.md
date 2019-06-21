# NextGIS Frontend offline demo

## Отображение подложки
Для того чтобы тайлы подложки отобразились в проекте, их нужно положить в папку "tiles" — https://github.com/nextgis/ngf_xyz_offline_demo/tree/master/tiles

Сразу внутри директории tiles должны лежать папки, содержащие тайлы на конкретный масштаб, — в их названии цифра. Промежуточных директорий быть не должно.

## Центр карты и масштаб
Чтобы изменить координаты центра карты, нужно вписать нужные координаты в следующую строку в скриптe main.js - https://github.com/nextgis/ngf_xyz_offline_demo/blob/master/main.js#L7

Первоначальный масштаб карты можно изменить здесь:
https://github.com/nextgis/ngf_xyz_offline_demo/blob/master/main.js#L8

## Онлайн демо

http://nextgis.ru/demo/ngf_xyz_offline_demo/

## Пример результата

![](http://m-d.me/img/ss/20190621_161046.png)
