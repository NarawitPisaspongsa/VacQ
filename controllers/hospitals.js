const Hospital = require('../models/Hospital');

//@desc     Get all hospitals
//@route    GET /api/v1/hospitals
//@access   Public
exports.getHospitals = async (req, res, next) => {
    try {
        const hospitals = await Hospital.find();

        res.status(200).json({success: true, count: hospitals.length, data: hospitals});
    } catch (err) {
        res.status(400).json({success: false});
    }
    res.status(200).json({ success: true, msg: 'Show all hospitals' });
};

//@desc     Get single hospital
//@route    GET /api/v1/hospitals/:id
//@access   Public
exports.getHospital = async (req, res, next) => {
    try {
        const hospital = await Hospital.findById(req.params.id);
        if(!hospital) {
            return res.status(400).json({success: false});
        }
        res.status(200).json({ success: true, data: hospital });
    } catch (err) {
        res.status(400).json({success: false});
    }
};

//@desc     Create new hospital
//@route    POST /api/v1/hospitals
//@access   Private
exports.createHospital = async (req, res, next) => {
    const hospital = await Hospital.createOne(req.body);
    
    res.status(201).json({ success: true, data: hospital });
};

//@desc     Update hospital
//@route    PUT /api/v1/hospitals/:id
//@access   Private
exports.updateHospital = async (req, res, next) => {
    try {
    const hospital = await Hospital.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true
    });
    if( !hospital ){
        return res.status(400).json({success: false});
    }
    res.status(200).json({ success: true, data: hospital});
    } catch (err) {
    res.status(400).json({success: false});
    }
};

//@desc     Delete hospital
//@route    DELETE /api/v1/hospitals/:id
//@access   Private
exports.deleteHospital = async (req, res, next) => {
    try {
        const hospital = await Hospital.findByIdAndDelete(req.params.id);

        if(!hospital){
            return res.status(400).json({success: false});
        }

        res.status(200).json({success:true, data: hospital});
    } catch (err) {
        res.status(400).json({success: false});
    }
};
