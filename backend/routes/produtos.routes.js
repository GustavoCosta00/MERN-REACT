const express = require("express")
const mongoose = require("mongoose")
const Product = require("../models/Product.js")

const router = express.Router()

// ROTAS PARA FAZER O CRUD DOS PRODUTOS

router.get("", async (req,res) => {   
    try{
        const products = await Product.find({})
        res.status(200).json({ success: true, data: products })
    } catch(erro){
        res.status(401).json({success:false, message: "Não foi possível encontrar os produtos"})
    }
})

router.post("", async (req,res) => {
    const product = req.body;

   if (!product.name || !product.price || !product.image) {
    return res.status(400).json({ success: false, message: "Campos obrigatórios ausentes" });
}
    const newProduct = new Product(product)

    try {
    await newProduct.save()
    res.status(201).json({ success: true, message: 'PRODUTO CRIADO COM SUCESSO!' })
} catch(e) {
    console.log(`Erro ${e}`)
}

})

router.delete("/:id", async (req,res) => {
    const { id } = req.params
    console.log(id)

    try{
        await Product.findByIdAndDelete(id)
        res.status(201).json({message: "PRODUTO EXCLUIDO COM SUCESSO!"})
    }catch(e){
        res.status(404).json({success:false, message: "Nenhum produto foi encontrado!"})
        console.log(`Aconteceu um erro ${e}`)
    }

})

router.put("/:id", async (req, res) => {
  const { id } = req.params;
  const product = req.body;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ success: false, message: "ID inválido" });
  }

  try {
    const newProduct = await Product.findByIdAndUpdate(id, product, { new: true });

    if (!newProduct) {
      return res.status(404).json({ success: false, message: "Produto não encontrado" });
    }

    res.status(200).json({ success: true, data: newProduct });
  } catch (e) {
    res.status(500).json({ success: false, message: "Erro ao atualizar produto", error: e.message });
  }
});

module.exports = router