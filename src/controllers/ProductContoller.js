const mogoose = require('mongoose');
const Product = mogoose.model('Product');

module.exports = {
    async index(req, res) {
        const {page = 1} = req.query;
        // consulta de produtos
        const products = await Product.paginate({}, {page, limit: 10});

        return res.json(products);
    },

    async show(req, res){
        const product = await Product.findById(req.params.id);
        res.json(product);
    },

    async store(req, res) {
        // criação de produto
        const product = await Product.create(req.body);
        return res.json(product);
    },

    async update(req, res){
        const product = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true });
        return res.json(product);
    },

    async destroy(req, res){
        await Product.findByIdAndRemove(req.params.id);
        return res.send();
    }
};