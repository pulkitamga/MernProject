const Cart = require('../../models/cart');

exports.addItemToCart = (req, res) => {
  Cart.findOne({ user: req.user._id }).then((cart) => {
        if (cart) {
            //if cart already exists then update cart by quantity
            const product = req.body.cartItems.product;
            const producExists = cart.cartItems.find(c => c.product == product);
            // console.log(product);
            // console.log(producExists);
            let condition, action;
            if (producExists) {
                condition = { "user": req.user._id, "cartItems.product": product}
                action = {
                    "$set": {
                        "cartItems.$": {
                            ...req.body.cartItems,
                            quantity: producExists.quantity + req.body.cartItems.quantity

                        },
                    }
                }
            }
           
            else {
                condition = { "user": req.user._id }
                action = {
                    "$push": {
                        "cartItems": req.body.cartItems
                    }
                }
            }
            //console.log("hii3");
            Cart.findOneAndUpdate(condition, action).then((_cart) => {
                    return res.status(200).json({ cart: _cart })
                }).catch((error) => {
                    return res.status(400).json(error.message)
                })
        }
        else {
            //if cart not exists then create new cart
            console.log('ddfdf');
            const cart = new Cart({
                user: req.user._id,
                cartItems: [req.body.cartItems]
            });

            cart.save().then(() => {
                res.status(200).send({ message: "Cart created successfully...", cart });
            }).catch((error) => {
                return res.status(400).json({ error });
            })
        }
    
    }).catch((error) => {return res.status(400).json({ error })})

};