import PasswordHolder from "../models/passwordHolder.js";
import mongoose from "mongoose"
import { cipherText } from "../encryptionHandler.js";


export const getHolders = async (req, res) => {
    const creator = req.params.id
    const { page } = req.query;

    try {
        const LIMIT = 5;
        const startIndex = (Number(page) - 1) * LIMIT
        const total = await PasswordHolder.countDocuments({'creator': creator})

        const holders = await PasswordHolder.find({'creator': creator}).sort({ _id: -1 }).limit(LIMIT).skip(startIndex);
        
        res.status(200).json({ data: holders, currentPage: Number(page), numberOfPages: Math.ceil(total/LIMIT) });
        // res.status(200).json(total);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

export const getHoldersBySearch = async (req, res) => {
    const creator = req.params.id
    const { searchQuery, tags } = req.query
    try {
        const name = new RegExp(searchQuery, 'i');

        const holders = await PasswordHolder.find({ 'creator': creator, $or: [{ name }, { tags: { $in: tags.split(',') } }] })

        res.json({ data: holders})
    } catch (error) {
        res.status(404).json({ message: error.message })
    }
}

export const createHolder = async (req, res) => {
    const {name, password, tags} = req.body;
    const hashedPassword = cipherText(password)
    const newHolder = new PasswordHolder({ name, password: hashedPassword, tags, creator: req.userId, createdAt: new Date().toISOString()});

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

    const updatedHolder = await PasswordHolder.findByIdAndUpdate(_id, {...holder, _id, password: cipherText(holder.password) }, { new: true });

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