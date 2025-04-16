const express = require('express');
const multer = require('multer');
const Orders = require('../models/Order');
const Medicine = require('../models/Medicine');

const router = express.Router();

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/'); 
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + '-' + file.originalname); 
    }
});



const upload = multer({ storage: storage });

router.post('/', upload.single('Image'), async (req, res) => {
    try {
        const { MedicineName, Price } = req.body;
        const image = req.file ? `/uploads/${req.file.filename}` : null;

        const medicine = new Medicine({
            MedicineName,
            Price,
            Image: image
        });

        await medicine.save();
        res.status(201).json(medicine);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});


router.get('/', async (req, res) => {
    try {
        let medicines = await Medicine.find();
        medicines = medicines.map(medicine => ({
            ...medicine._doc,
            Image: medicine.Image.replace(/\\/g, '/')
        }));

        res.status(200).json(medicines);
    } catch (err) {
        res.status(500).send('Server error');
    }
});

router.get('/:id', async (req, res) => {
    try {
        const medicine = await Medicine.findById(req.params.id);
        if (!medicine) {
            return res.status(404).json({ msg: 'Medicine not found' });
        }
        res.status(200).json(medicine);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});


// router.put('/:id', async (req, res) => {
//     try {
//         const { MedicineName, Price } = req.body;

//         const medicine = await Medicine.findById(req.params.id);
//         if (!medicine) {
//             return res.status(404).json({ msg: 'Medicine not found' });
//         }

//         medicine.MedicineName = MedicineName;
//         medicine.Price = Price;

//         await medicine.save();
//         res.status(200).json(medicine);
//     } catch (err) {
//         console.error(err.message);
//         res.status(500).send('Server error');
//     }
// });

// Updated PUT route to handle image updates
router.put('/:id', upload.single('Image'), async (req, res) => {
    try {
        const { MedicineName, Price } = req.body;
        const image = req.file ? `/uploads/${req.file.filename}` : undefined;

        const medicine = await Medicine.findById(req.params.id);
        if (!medicine) {
            return res.status(404).json({ msg: 'Medicine not found' });
        }

        // Update fields
        medicine.MedicineName = MedicineName;
        medicine.Price = Price;
        if (image) {
            medicine.Image = image; // Update image if new one provided
        }

        await medicine.save();
        res.status(200).json(medicine);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});


// Delete Medicine
router.delete('/:id', async (req, res) => {
    try {
        const medicine = await Medicine.findByIdAndDelete(req.params.id);

        if (!medicine) {
            return res.status(404).json({ msg: 'Medicine not found' });
        }

        res.status(200).json({ msg: 'Medicine deleted successfully' });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});

module.exports = router;
