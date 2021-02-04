const express = require('express');
const router = express.Router();
const { ensureAuthenticated, forwardAuthenticated } = require('../config/auth');

// Welcome Page
router.get('/', forwardAuthenticated, (req, res) => res.render('welcome'));

// Contact
router.get('/contact', forwardAuthenticated, (req, res) => res.render('contact'));

//about
router.get('/about', forwardAuthenticated, (req, res) => res.render('about'));
// FAQ

router.get('/help', forwardAuthenticated, (req, res) => res.render('faq'));

//giveaway

router.get('/weekly-giveaway', forwardAuthenticated, (req, res) => res.render('weekly'));

router.get('/monthly-giveaway', forwardAuthenticated, (req, res) => res.render('monthly'));


//coins
router.get('/bitcoin', forwardAuthenticated, (req, res) => res.render('bitcoin'));

router.get('/ethereum', forwardAuthenticated, (req, res) => res.render('ethereum'));

router.get('/tron', forwardAuthenticated, (req, res) => res.render('tron'));

router.get('/ripple', forwardAuthenticated, (req, res) => res.render('ripple'));

router.get('/litecoin', forwardAuthenticated, (req, res) => res.render('litecoin'));

router.get('/binance', forwardAuthenticated, (req, res) => res.render('binance'));


// TERMS
router.get('/term-and-condition', forwardAuthenticated, (req, res) => res.render('terms'));

//PRIVACY POLICY
router.get('/privacy-policy', forwardAuthenticated, (req, res) => res.render('privacy'));

//REFUND POLICY
router.get('/refund-policy', forwardAuthenticated, (req, res) => res.render('refund'));

//What is Tron
router.get('/what-is-tron', forwardAuthenticated, (req, res) => res.render("tron"));


//How to buy Tron
router.get('/how-to-buy-tron', forwardAuthenticated, (req, res) => res.render('BuyTron'));

// Dashboard
router.get('/dashboard', ensureAuthenticated, (req, res) =>
  res.render('dashboard', {
    user: req.user
  })
);
router.get('/profile', ensureAuthenticated, (req, res) =>
  res.render('profile', {
    user: req.user
  })
);
router.get('/invest', ensureAuthenticated, (req, res) =>
  res.render('invest', {
    user: req.user
  })
);
router.get('/select-coin-19843667164', ensureAuthenticated, (req, res) =>
  res.render('coin', {
    user: req.user
  })
);

router.get('/return-on-investments', ensureAuthenticated, (req, res) =>
  res.render('returns', {
    user: req.user
  })
);

router.get('/bit-pay', ensureAuthenticated, (req, res) =>
  res.render('bitpay', {
    user: req.user
  })
);


router.get('/ether-pay', ensureAuthenticated, (req, res) =>
  res.render('etherpay', {
    user: req.user
  })
);


router.get('/litecoin-pay', ensureAuthenticated, (req, res) =>
  res.render('litecoinpay', {
    user: req.user
  })
);


router.get('/binance-pay', ensureAuthenticated, (req, res) =>
  res.render('binancepay', {
    user: req.user
  })
);


router.get('/ripple-pay', ensureAuthenticated, (req, res) =>
  res.render('ripplepay', {
    user: req.user
  })
);


router.get('/tron-pay', ensureAuthenticated, (req, res) =>
  res.render('tronpay', {
    user: req.user
  })
);





router.get('/history', ensureAuthenticated, (req, res) =>
  res.render('history', {
    user: req.user
  })
);
router.get('/withdrawal', ensureAuthenticated, (req, res) =>
  res.render('withdrawal', {
    user: req.user
  })
);
router.get('/analytics', ensureAuthenticated, (req, res) =>
  res.render('analytics', {
    user: req.user
  })
);

router.get('/settings', ensureAuthenticated, (req, res) =>
  res.render('settings', {
    user: req.user
  })
);
router.get('/checkout', ensureAuthenticated, (req, res) =>
  res.render('checkout', {
    user: req.user
  })
);
router.get('/bloop', ensureAuthenticated, (req, res) =>
  res.render('complete', {
    user: req.user
  })
);


module.exports = router;
