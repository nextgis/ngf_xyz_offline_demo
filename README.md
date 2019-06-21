# NextGis Frontend offline demo

## Отображение подложки
Для того чтобы тайлы подложки отобразились в проекте, их нужно положить в папку "tiles" — https://github.com/nextgis/ngf_xyz_offline_demo/tree/master/tiles

Сразу внутри директории tiles должны лежать папки, содержащие тайлы на конкретный масштаб, — в их названии цифра. Промежуточных директорий быть не должно.

## Центр карты
Чтобы изменить координаты центра карты, нужно вписать нужные координаты в слеудующую строчку в скриптe main.js - https://github.com/nextgis/ngf_xyz_offline_demo/blob/master/main.js#L7

Первоначальный масштаб карты можно изменить здесь:
https://github.com/nextgis/ngf_xyz_offline_demo/blob/master/main.js#L8
