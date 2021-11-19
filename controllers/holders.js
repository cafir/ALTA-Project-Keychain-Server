import PasswordHolder from "../models/passwordHolder.js";
import mongoose from "mongoose"

export const getHolders = async (req, res) => {
    try {
        const passwordHolders = await PasswordHolder.find();

        res.status(200).json(passwordHolders);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

export const createHolder = async (req, res) => {
    const holder = req.body;

    const newHolder = new PasswordHolder({ ...holder, creator: req.userId, createdAt: new Date().toISOString()});

    try {
        await newHolder.save();

        res.status(201).json(newHolder);
    } catch (error) {
        res.status(409).json( { message: error.message })
    }
}

export const updateHolder = async (req, res) => {
    const { id: _id } = req.params;
    const holder = req.body;

    if (!mongoose.Types.ObjectId.isValid(_id)) {
        return res.status(404).send("no holder with that id")
    }

    const updatedHolder = await PasswordHolder.findByIdAndUpdate(_id, {...holder, _id }, { new: true });

    res.json(updatedHolder);
}

export const deleteHolder = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).send("no holder with that id")
    }

    await PasswordHolder.findByIdAndRemove(id)

    res.json({ message: 'Holder deleted succesfully'})
}