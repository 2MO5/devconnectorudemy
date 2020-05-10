const express = require("express");
const router = express.Router();
const request = require("request");
const config = require("config");
const auth = require("../../middleware/auth");
const { check, validationResult } = require("express-validator");

const Profile = require("../../models/Profile");
const User = require("../../models/User");

//@route   GET api/profile/me
//@desc    GET current users profile
//@access  Private

router.get("/me", auth, async (req, res) => {
  //adding 'auth' as the second parameter to protect the route.For any route that you wanna protect, that's all you have to do!

  try {
    const profile = await Profile.findOne({
      user: req.user.id
    }).populate("user", ["name", "avatar"]);

    //no profile?

    if (!profile) {
      return res.status(400).json({ msg: "There is no profile for this user" });
    }

    //have profile?
    res.json(profile);
  } catch (err) {
    console.err(err.message);
    res.status(500).send("server error");
  }
});

//@route   GET api/profile/
//@desc    Create or upate user profile
//@access  Private
router.post(
  "/",
  [
    auth,
    [
      check("status", "status is required").not().isEmpty(), //checking for status
      check("skills", "skills is required").not().isEmpty()
    ]
  ], //checking for status
  async (req, res) => {
    const errors = validationResult(req);
    //wehen there's errors
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    //pulling out all the following from the body with req.body
    const {
      company,
      location,
      website,
      bio,
      skills,
      status,
      githubusername,
      social,
      youtube,
      twitter,
      instagram,
      linkedin,
      facebook
    } = req.body;

    //Building the profile object

    const profileFields = {};
    profileFields.user = req.user.id;

    if (company) profileFields.company = company;
    if (website) profileFields.website = website;
    if (location) profileFields.location = location;
    if (bio) profileFields.bio = bio;
    if (status) profileFields.status = status;
    if (githubusername) profileFields.githubusername = githubusername;

    if (skills) {
      profileFields.skills = skills.split(",").map(skill => skill.trim());
    }

    console.log(profileFields.skills);

    //Building social object

    profileFields.social = {};

    if (youtube) profileFields.social.youtube = youtube;
    if (twitter) profileFields.social.twitter = twitter;
    if (facebook) profileFields.social.facebook = facebook;
    if (linkedin) profileFields.social.linkedin = linkedin;
    if (instagram) profileFields.social.instagram = instagram;

    try {
      //returning  a promise
      let profile = await Profile.findOne({ user: req.user.id });

      if (profile) {
        profile = await Profile.findOneAndUpdate(
          { user: req.user.id },
          { $set: profileFields },
          { new: true }
        );

        return res.json(profile);
      }

      //creating a profile if no profile was found
      profile = new Profile(profileFields);

      await profile.save();
      res.json(profile);
    } catch (err) {
      console.error(err.message);
      res.status(500).send("server error");
    }
  }
);

//@route   GET api/profile/
//@desc   Get all profiles
//@access  Public

router.get("/", async (req, res) => {
  try {
    const profiles = await Profile.find().populate("user", ["name", "avatar"]);
    res.json(profiles);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

//@route   GET api/profile/user/:user_id
//@desc   Get a profile by user ID
//@access  Public

router.get("/user/:user_id", async (req, res) => {
  try {
    const profile = await Profile.findOne({
      user: req.params.user_id
    }).populate("user", ["name", "avatar"]);

    if (!profile)
      return res.status(400).json({ msg: "No such profile was found" });

    res.json(profile); //this is where the data is sent
  } catch (err) {
    //if there's a COMPLETE error that's what catch is for
    console.error(err.message);

    if (err.kind == "ObjectId") {
      return res.status(400).json({ msg: "No such profile was found" });
    }

    res.status(500).send("Server Error");
  }
});

//@route   DELETE api/profile/
//@desc   Delete  profile, user, & posts
//@access  Private

router.delete("/", auth, async (req, res) => {
  try {
    //@todo -remove users posts
    await Profile.findOneAndRemove({ user: req.user.id });
    //Remove User
    await User.findOneAndRemove({ _id: req.user.id });

    res.json({ msg: "User is removed" });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

//@route   PUT api/profile/experience
//@desc    Add profile experience
//@access  Private

router.put(
  "/experience",
  [
    auth,
    [
      check("title", "Title is required").not().isEmpty(),
      check("company", "Company is required").not().isEmpty(),
      check("from", "From date is required").not().isEmpty()
    ]
  ],
  async (req, res) => {
    const errors = validationResult(req);
    //if there's an error
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    //pulling these out from the body

    const {
      title,
      company,
      location,
      from,
      to,
      current,
      description
    } = req.body;

    //creating new experience

    const newExp = {
      title,
      company,
      location,
      from,
      to,
      current,
      description
    };

    try {
      const profile = await Profile.findOne({ user: req.user.id });

      profile.experience.unshift(newExp);

      await profile.save();

      res.json(profile); //sending the data
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server Error");
    }
  }
);

//@route   DELETE api/profile/experience/:exp_id
//@desc    Delete  experience from profile
//@access  Private

router.delete("/experience/:exp_id", auth, async (req, res) => {
  try {
    const profile = await Profile.findOne({ user: req.user.id });

    //Getting the index needed to be removed
    // Go to the item in the experience and find the id that's taken from the body aka the one that's requested
    const removeIndex = profile.experience
      .map(item => item.id)
      .indexOf(req.params.exp_id);

    //taking it out
    profile.experience.splice(removeIndex, 1);

    //saving the profile
    await profile.save();

    //seding the data from the database
    res.json(profile);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

//@route   PUT api/profile/education
//@desc    Add profile education
//@access  Private

router.put(
  "/education",
  [
    auth,
    [
      // make sue these ain't empty
      check("school", "School is required").not().isEmpty(),
      check("degree", "Degree is required").not().isEmpty(),
      check("from", "From study is required").not().isEmpty(),
      check("fieldofstudy", "Field of study is required").not().isEmpty()
    ]
  ],
  async (req, res) => {
    const errors = validationResult(req);
    //if there's an error
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    //pulling these out from the body

    const {
      school,
      degree,
      fieldofstudy,
      from,
      to,
      current,
      description
    } = req.body;

    //creating new education

    const newEdu = {
      school,
      degree,
      fieldofstudy,
      from,
      to,
      current,
      description
    };

    try {
      const profile = await Profile.findOne({ user: req.user.id });

      profile.education.unshift(newEdu);

      await profile.save();

      res.json(profile); //sending the data
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server Error");
    }
  }
);

//@route   DELETE api/profile/education:exp_id
//@desc    Delete  education from profile
//@access  Private

router.delete("/education/:edu_id", auth, async (req, res) => {
  try {
    const profile = await Profile.findOne({ user: req.user.id });

    //Getting the index needed to be removed
    // Go to the item in the education and find the id that's taken from the body aka the one that's requested
    const removeIndex = profile.education
      .map(item => item.id)
      .indexOf(req.params.edu_id);

    //taking it out
    profile.education.splice(removeIndex, 1);

    //saving the profile
    await profile.save();

    //seding the data from the database
    res.json(profile);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

//@route   PUT api/profile/github/
//@desc    GET user repos from  github
//@access  Public

router.get("/github/:username", (req, res) => {
  try {
    const options = {
      uri: `https://api.github.com/users/${req.params
        .username}/repos?per_page=5&
      sort=created:asc&client_id=${config.get(
        "githubClientId"
      )}&client_secret=${config.get("githubSecret")}`,
      method: "GET",
      headers: { "user-agent": "node.js" }
    };

    request(option, (error, response, body) => {
      if (error) console.error(error);

      if (response.statusCode !== 200) {
        res.status(400).send("No git hub profile is found");
      }
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("server error");
  }
});

module.exports = router;
