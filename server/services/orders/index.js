const models = require('../../models');

function getOrderItems (req, res){
	const user_code = req.decoded.user_code;
	models.Order.findAll({
		where: {
			user_code: user_code
		}
	}).then(result => {
		console.log(res);
		return res.status(200).json(result);
	}).catch(function (err){
		console.log((err.toString()));
		return res.status(403).json({success: false, message: err.toString()})
	})
}


function getDeliveryOrderItems (req, res){
	const user_code = req.decoded.user_code;

	models.Order.findAll({
		where: {
			user_code: user_code,
			is_purchase_item: false
		}
	}).then(result => {
		return res.status(200).json(result);
		console.log(res)
	}).catch(function (err){
		console.log((err.toString()))
		return res.status(403).json({success: false, message: err.toString()})
	})
}

function getPurchaseOrderItems (req, res){
	const user_code = req.decoded.user_code;

	models.Order.findAll({
		where: {
			user_code: user_code,
			is_purchase_item: true
		}
	}).then(result => {
		return res.status(200).json(result);
		console.log(res)
	}).catch(function (err){
		console.log((err.toString()))
		return res.status(403).json({success: false, message: err.toString()})
	})
}

function getOrderItem (req, res){
	const order_id = req.query.order_id;

	models.Order.findAll({
		where: {
			order_id: order_id
		}
	}).then(result => {
		// console.log(res);
		return res.status(200).json(result);
	}).catch(function (err){
		console.log((err.toString()));
		return res.status(403).json({success: false, message: err.toString()})
	})
}

function getAllOrderItems (req, res){
    models.Order.findAll({
        order: [
            // Will escape username and validate DESC(/ASC) against a list of valid direction parameters
            ['order_id', 'DESC']
        ]
    }).then(result => {
        return res.status(200).json(result);
    }).catch(function (err){
        console.log((err.toString()));
        return res.status(403).json({success: false, message: err.toString()})
    })
}

function getAllDeliveryOrderItems (req, res){
    models.Order.findAll({
        where: {
        	is_purchase_item: false
        },
        order: [
            // Will escape username and validate DESC(/ASC) against a list of valid direction parameters
            ['order_id', 'DESC']
        ]
    }).then(result => {
        return res.status(200).json(result);
    }).catch(function (err){
        console.log((err.toString()));
        return res.status(403).json({success: false, message: err.toString()})
    })
}

function getAllPurchaseOrderItems (req, res){
    models.Order.findAll({
        where: {
        	is_purchase_item: true
        }
    }).then(result => {
        return res.status(200).json(result);
    }).catch(function (err){
        console.log((err.toString()));
        return res.status(403).json({success: false, message: err.toString()})
    })
}

function getAllInvoiceItems (req, res){
    models.Invoice.findAll({
        invoice: [
            // Will escape username and validate DESC(/ASC) against a list of valid direction parameters
            ['order_id', 'DESC']
        ]
    }).then(result => {
        return res.status(200).json(result);
    }).catch(function (err){
        console.log((err.toString()));
        return res.status(403).json({success: false, message: err.toString()})
    })
}

function getInvoiceItems (req, res){
    const user_code = req.decoded.user_code;

	models.FinalInvoice.find({
		where: {
			user_code: user_code,
			status: "Pending"
		}
	}).then(result => {
		console.log(res);
		return res.status(200).json(result);
	}).catch(function (err){
		console.log((err.toString()))
		return res.status(403).json({success: false, message: err.toString()})
	})
}

function addWeight (req, res){
	const order_id = req.body.order_id;
	const weight = req.body.weight;

	models.Order.update({
			weight: weight,
			status: "Order Priced"
		},
		{
			where: {
				order_id: order_id
			}
	}).then(result => {
		console.log(res);
		return res.status(200).json(result);
	}).catch(function (err){
		console.log((err.toString()))
		return res.status(403).json({success: false, message: err.toString()})
	})
}

function deleteWeight (req, res){
	console.log(req);
	const order_id = req.body.order_id;

	models.Order.update({
			weight: null,
			status: "Shipping"
		},
		{
			where: {
				order_id: order_id
			}
	}).then(result => {
		console.log(res);
		return res.status(200).json(result);
	}).catch(function (err){
		console.log((err.toString()))
		return res.status(403).json({success: false, message: err.toString()})
	})
}

function deleteInvoiceItem (req, res){
	const order_id = req.body.order_id;

	models.Order.update({
			status: "Order Priced"
		},
		{
			where: {
				order_id: order_id
			}
	});

	models.Invoice.destroy({
      where: {
          order_id: order_id
      }
    }).then(result => {
    	return res.status(200).json(result)
    }).catch(function (err){
        console.log(err.toString());
      return res.status(403).json({success: false, message: err.toString()})
    })

}

function addInvoice (req, res){
	const user_code = req.body.user_code;
	const user_name = req.body.user_name;
	const order_id = req.body.order_id;
	const from = req.body.from;
	const name = req.body.name;
	const size = req.body.size;
	const colour = req.body.colour;
	const quantity = req.body.quantity;
	const weight = req.body.weight;
	const bundleport_price = weight * 8000;

	models.Invoice.create({
		order_id: order_id,
		user_code: user_code,
		user_name: user_name,
		from: from,
		name: name,
		size: size,
		colour: colour,
		quantity: quantity,
		weight: weight,
		bundleport_price: bundleport_price
	})

	models.Order.update({
			status: "Order Invoiced",
			bundleport_price: bundleport_price
		},
		{
			where: {
				order_id: order_id
			}
	}).then(result => {
		console.log(res);
		return res.status(200).json(result);
	}).catch(function (err){
		console.log((err.toString()));
		return res.status(403).json({success: false, message: err.toString()})
	})
}

function invoicedItem (req, res){
	const order_id = req.body.order_id;

	models.Order.update({
			status: "Invoice Issued"
		},
		{
			where: {
				order_id: order_id
			}
	});

	models.Invoice.destroy({
      where: {
          order_id: order_id
      }
    }).then(result => {
    	return res.status(200).json(result)
    }).catch(function (err){
        console.log(err.toString());
      return res.status(403).json({success: false, message: err.toString()})
    })
}

function finalInvoice(req, res) {
	const user_code = req.body.user_code;
	const user_name = req.body.user_name;
	const amount = req.body.amount;
	const order_ids = req.body.order_ids;
	const weight = req.body.weight;

	models.FinalInvoice.create({
		user_code: user_code,
		user_name: user_name,
		status: "Pending",
		amount: amount,
		order_ids: order_ids,
		weight: weight
	}).then(result => {
    	return res.status(200).json(result)
    }).catch(function (err){
        console.log(err.toString());
      return res.status(403).json({success: false, message: err.toString()})
    })
}

function getFinalInvoice(req, res) {
	const user_code = req.decoded.user_code;

	models.FinalInvoice.findAll({
		where: {
			user_code: user_code
		}
	}).then(result => {
    	return res.status(200).json(result)
    }).catch(function (err){
        console.log(err.toString());
      return res.status(403).json({success: false, message: err.toString()})
    })
}

function getAllFinalInvoice(req, res) {
	models.FinalInvoice.findAll({
		final_invoice: [
            // Will escape username and validate DESC(/ASC) against a list of valid direction parameters
            ['invoice_no', 'DESC']
        ]
	}).then(result => {
    	return res.status(200).json(result)
    }).catch(function (err){
        console.log(err.toString());
      return res.status(403).json({success: false, message: err.toString()})
    })
}

function paymentPaid (req, res){
	const invoice_no = req.body.invoice_no;
	const order_id = req.body.order_id;
    var amount = req.body.amount;
    var currency = req.body.currency;
    const user_name = req.body.user_name;
    var user_code = "";
    var d = new Date();

    format = function date2str(x, y) {
	    var z = {
	        M: x.getMonth() + 1,
	        d: x.getDate(),
	        h: x.getHours(),
	        m: x.getMinutes(),
	        s: x.getSeconds()
	    };
	    y = y.replace(/(M+|d+|h+|m+|s+)/g, function(v) {
	        return ((v.length > 1 ? "0" : "") + eval('z.' + v.slice(-1))).slice(-2)
	    });

	    return y.replace(/(y+)/g, function(v) {
	        return x.getFullYear().toString().slice(-v.length)
	    });
	}

	models.Order.update({
		status: "Delivered"
	},
	{
		where: {
			order_id: order_id
		}
	});

	models.FinalInvoice.update({
			status: "Paid",
			paid_amount: amount.replace(" ", ""),
			paid_date: format(d, 'yyyy-MM-dd hh:mm:ss')
		},
		{
			where: {
				invoice_no: invoice_no
			}
	})

    models.FinalInvoice.findAll({
		where: {
			invoice_no: invoice_no
		}
	}).then(result => {
		user_code = result[0].dataValues["user_code"];
		console.log(user_code);
		if (currency === "HK$") {
			amount = amount.replace(" HK$", "").trim();
		}
		else {
			currency = "KR₩"
			amount = amount.replace(" 원", "").trim();
		}

		models.Transaction.create({
			invoice_no: invoice_no,
			txn_type: "Logistics Sales",
			txn_side: "IN",
			user_code: user_code,
			user_name: user_name,
			order_ids: order_id,
			currency: currency,
			price: amount
	    }).then(result => {
    	return res.status(200).json(result)
	    }).catch(function (err){
	        console.log(err.toString());
	      return res.status(403).json({success: false, message: err.toString()})
	    })
    });
}

function paymentPending (req, res){
	const invoice_no = req.body.invoice_no;
	const order_id = req.body.order_id;

	models.Order.update({
		status: "Invoice Issued"
	},
	{
		where: {
			order_id: order_id
		}
	}).catch(function (err){
        console.log(err.toString());
        return res.status(403).json({success: false, message: err.toString()})
    });

	models.FinalInvoice.update({
			status: "Pending",
			paid_amount: null
		},
		{
			where: {
				invoice_no: invoice_no
			}
	}).then(result => {
    	return res.status(200).json(result)
    }).catch(function (err){
        console.log(err.toString());
      return res.status(403).json({success: false, message: err.toString()})
    })

    models.Transaction.destroy({
		where: {
			invoice_no: invoice_no
		}
    })
}

function updateOrderStatus (req, res) {
	const status = req.body.status;
	const order_id = req.body.order_id;

	models.Order.update({
		status: status
	},
	{
		where: {
			order_id: order_id
		}
	}).then(result => {
    	return res.status(200).json(result)
    }).catch(function (err){
        console.log(err.toString());
      return res.status(403).json({success: false, message: err.toString()})
    })
}

function addTransaction (req, res){
	const user_name = req.decoded.user_name;
    const user_code = req.decoded.user_code;

    const amount = req.body.amount;
    const currency = req.body.currency;
    const txn_type = req.body.txn_type;
    const txn_side = req.body.txn_side;
    const remarks = req.body.remarks;

	models.Transaction.create({
		txn_type: txn_type,
		txn_side: txn_side,
		user_code: user_code,
		user_name: user_name,
		currency: currency,
		price: amount,
		remarks: remarks
    }).then(result => {
		return res.status(200).json(result)
    }).catch(function (err){
        console.log(err.toString());
      return res.status(403).json({success: false, message: err.toString()})
    })
}

function purchaseProcessed (req, res){
	const order_id = req.body.order_id;

	models.Order.update({
		status: "Ordered"
	},
	{
		where: {
			order_id: order_id
		}
	}).then(result => {
    	return res.status(200).json(result)
    }).catch(function (err){
        console.log(err.toString());
      return res.status(403).json({success: false, message: err.toString()})
    })
}

function purchaseUnprocessed (req, res){
	const order_id = req.body.order_id;

	models.Order.update({
		status: "Purchase Ordered"
	},
	{
		where: {
			order_id: order_id
		}
	}).then(result => {
    	return res.status(200).json(result)
    }).catch(function (err){
        console.log(err.toString());
      return res.status(403).json({success: false, message: err.toString()})
    })
}

module.exports = {
	getOrderItems,
	getDeliveryOrderItems,
	getPurchaseOrderItems,
	getOrderItem,
    getAllOrderItems,
    getAllDeliveryOrderItems,
    getAllPurchaseOrderItems,
    getAllInvoiceItems,
    getInvoiceItems,
    getFinalInvoice,
    addWeight,
    deleteWeight,
    addInvoice,
    deleteInvoiceItem,
    invoicedItem,
    finalInvoice,
    getAllFinalInvoice,
    paymentPaid,
    paymentPending,
    updateOrderStatus,
    addTransaction,
    purchaseProcessed,
    purchaseUnprocessed
};
