const express = require('express');
const router = express.Router();
const data = require('../data/products.json');

// Helper to pass common business info
const businessInfo = {
    name: "Havells Distributor Rattan Electricals Rewari",
    phone: "09899915202",
    address: "Behind Government Girls School GL Bhargav Market, Raam Bagh Mahalla, Rewari, Kanmajra, Haryana 123401",
    url: "https://example.com", // Replace with actual URL
};

// Home Page
router.get('/', (req, res) => {
    res.render('pages/home', {
        title: "Havells Distributor Rewari | Rattan Electricals",
        description: "Authorized Havells Distributor in Rewari. Direct company supply of genuine switches, wires, MCB, LED lights. Call 09899915202.",
        businessInfo,
        categories: data.categories,
        products: data.products.slice(0, 4), // Show some featured products
        isPageActive: true // Toggle for Home Page
    });
});

// About Page
router.get('/about', (req, res) => {
    res.render('pages/about', {
        title: "About Us | Rattan Electricals Rewari",
        description: "Learn more about Rattan Electricals, your trusted Havells distributor in Rewari since years. Top-rated customer service.",
        businessInfo: businessInfo,
        isPageActive: false // Currently under maintenance
    });
});

// Categories Page
router.get('/categories', (req, res) => {
    res.render('pages/categories', {
        title: "Product Categories | Rattan Electricals Rewari",
        description: "Explore our extensive range of Havells electrical supplies.",
        businessInfo: businessInfo,
        categories: data.categories, 
        isPageActive: false // Currently under maintenance
    });
});

// Products Listing Page
router.get('/products', (req, res) => {
    res.render('pages/products', {
        title: "All Products | Havells Distributor Rewari",
        description: "View our full catalog of original Havells electrical supplies available in Rewari.",
        businessInfo,
        products: data.products,
        isPageActive: false // Toggle for Products Page
    });
});

// Single Product Page (SEO URL Example)
router.get('/products/:slug', (req, res) => {
    const product = data.products.find(p => p.slug === req.params.slug);
    if (!product) return res.status(404).send('Product not found');
    
    res.render('pages/product-detail', {
        title: `${product.name} | Rattan Electricals`,
        description: product.description,
        businessInfo,
        product,
        isPageActive: true // Toggle for Single Product Page
    });
});

// Contact Page
router.get('/contact', (req, res) => {
    res.render('pages/contact', {
        title: "Contact Us | Rattan Electricals Rewari",
        description: "Get in touch with Rattan Electricals in Rewari for bulk orders and quotes on Havells electrical supplies.",
        businessInfo,
        isPageActive: false // Toggle for Contact Page
    });
});

// SEO: Sitemap Placeholder
router.get('/sitemap.xml', (req, res) => {
    res.type('application/xml');
    res.send(`<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url><loc>${businessInfo.url}/</loc></url>
  <url><loc>${businessInfo.url}/about</loc></url>
  <url><loc>${businessInfo.url}/categories</loc></url>
  <url><loc>${businessInfo.url}/products</loc></url>
  <url><loc>${businessInfo.url}/contact</loc></url>
</urlset>`);
});

// SEO: Robots.txt Placeholder
router.get('/robots.txt', (req, res) => {
    res.type('text/plain');
    res.send(`User-agent: *
Allow: /
Sitemap: ${businessInfo.url}/sitemap.xml`);
});

module.exports = router;