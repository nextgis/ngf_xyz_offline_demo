var _intervalId;

// initialize webmap
var ngwMap = new NgwMap({
    target: 'map',
    // qmsId: 487,
    center: [131.894, 43.029],
    zoom: 15
});


getGeoJson().then(function (geojson) {

    ngwMap.addBaseLayer('TILE', {
        url: config.tiles.value,
        visibility: true
    })

    ngwMap.addLayer('GEOJSON', {
        id: config.geojson.value,
        data: geojson,
        visibility: true,
        paint: config.paint,
        selectedPaint: config.selectedPaint,
        selectable: true,
        selectOnHover: true,
        popupOnSelect: true,
        popupOptions: {
            createPopupContent: createPopupContent
        }
    }).then(function (layer) {
        var layers = layer.getLayers();

        for (var fry = 0; fry < layers.length; fry++) {
            var feature = layers[fry].feature;
            feature._id = fry;
        }

        // only for leaflet
        if (layer.layer.getBounds) {
            var b = layer.layer.getBounds().toBBoxString();
            ngwMap.fitBounds(b.split(','));
        }


    });

    // Animation control craeation
    var animationControl = ngwMap.createToggleControl({
        onClick: function (status) {
            if (status) {
                startSelection();
            } else {
                stopRandomSelection();
            }
        },

        html: {
            on: '<i class="material-icons">pause</i>',
            off: '<i class="material-icons">play_arrow</i>'
        },
    });

    ngwMap.addControl(animationControl, 'top-left');

    // Create configuration control
    var configElement = document.createElement('div');
    configElement.className = 'config-panel';
    configElement.innerHTML = '<label>Animation delay: <input type="number" name="interval"></input></label>';

    var intervalInput = configElement.querySelector('input');
    intervalInput.value = config.interval.value;
    intervalInput.addEventListener('change', onConfigUpdate);
    intervalInput.addEventListener('input', onConfigUpdate);

    var configControl = ngwMap.createControl({
        onAdd: function () {
            return configElement;
        }
    }, { bar: true });

    ngwMap.addControl(configControl, 'top-right');

    // helper functions
    var _showsCount = 0;

    function startSelection() {
        var selectableLayer = ngwMap.getLayer(config.geojson.value);
        var layers = selectableLayer.getLayers();
        _intervalId = setInterval(function () {
            // var randomLayer = layers[Math.floor(Math.random() * layers.length)].feture._id;
            var id = _showsCount++ % layers.length;
            selectLayerFeatureById(selectableLayer, id);
        }, config.interval.value);
    }

    function stopRandomSelection() {
        clearInterval(_intervalId);
    }

    function selectLayerFeatureById(layer, id) {
        var selectableLayer = ngwMap.getLayer(layer);
        selectableLayer.select(function (e) {
            return e.feature._id === id;
        });
    }

    function createPopupContent(e) {
        var feature = e.feature;
        var content = '<div class="feature-popup">';
        for (var f in feature.properties) {
            if (feature.properties.hasOwnProperty(f)) {
                content += '<div><span class="property-key">' + f +
                    '</span>: <span class="property-value">' +
                    feature.properties[f] +
                    '</span></div>';
            }
        }
        content += '</div>';
        return content;
    }

    function onConfigUpdate() {

        config.interval.value = Number(intervalInput.value);
        // update current animation config
        if (_intervalId) {
            stopRandomSelection();
            startSelection();
        }
    }

});

function getGeoJson() {
    return new Promise(function (resolve, reject) {

        resolve(window[config.geojson.value]);

        // var xhr = new XMLHttpRequest();
        // xhr.open('GET', config.geojson.value + '.geojson');
        // xhr.setRequestHeader('Content-Type', 'application/json');
        // // xhr.responseType = 'json';
        // xhr.onload = function () {
        //     if (xhr.status !== 200) {
        //         reject();
        //     } else {
        //         resolve(JSON.parse(xhr.response));
        //     }
        // };
        // xhr.send();
    });
}

