const Profile = require("../Models/profile.model");

exports.showProfilePage = async (req,res) => {
    try {
        let profile = await Profile.find();
        res.render("profile.ejs",{profile})
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal Server Error" });
    }
}

exports.profilePage = async (req,res) => {
    try{
        let profile = await Profile.findOne({firstName:req.body.firstName,lastName:req.body.lastName,email:req.body.email})
        if(profile){
            res.json({message:"Already Added"});
        }
        profile = await Profile.create(req.body);
        res.redirect("/api/profile/")

        
    
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal Server Error" });
    }
}


// edit profile
exports.editprofile = async (req, res) => {
    try {
        const profile = await Profile.findById(req.params.id);
        if (!profile) {
            return res.status(404).json({ message: "Profile not found" });
        }
        res.render("editProfile.ejs", { profile });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal Server Error" });
    }
};

// New route to handle the update
exports.updateProfile = async(req, res) => {
try {
            const { firstName, lastName, email } = req.body;
            let profile = await Profile.findById(req.params.id);
    
            if (!profile) {
                return res.status(404).json({ message: "Profile not found" });
            }
    
            // Update the profile with new data
            profile.firstName = firstName;
            profile.lastName = lastName;
            profile.email = email;
    
            await profile.save();
            res.redirect("/api/profile/");
        } catch (error) {
            console.log(error);
            res.status(500).json({ message: "Internal Server Error" });
        }
    };

// deleteprofile        
    
exports.deleteProfile = async (req, res) => {
    try {
        await Profile.findByIdAndDelete(req.params.id);
        res.redirect("/api/profile/");
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal Server Error" });
    }
};