function customUrlImage( element, req ) {
    element.imageUrl = `${req.protocol}://${req.get('host')}/images/${element.imageUrl}`;
    return element;
}

module.exports = { customUrlImage };