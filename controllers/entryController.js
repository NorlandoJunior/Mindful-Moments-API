const Entry = require('../models/Entry');

exports.getEntries = async (req, res) => {
  try {
    const entries = await Entry.find({ userId: req.user.id }).sort({ date: -1 });
    res.json(entries);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getEntryById = async (req, res) => {
  try {
    const entry = await Entry.findOne({ _id: req.params.id, userId: req.user.id });
    if (!entry) return res.status(404).json({ message: 'Entry not found' });
    res.json(entry);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.createEntry = async (req, res) => {
  try {
    const { mood, reflection, minutesMeditated, tags } = req.body;

    //validation
    if (!mood || typeof mood !== 'string') {
      return res.status(400).json({ message: 'Mood is required and must be a string.' });
    }
    if (minutesMeditated !== undefined && typeof minutesMeditated !== 'number') {
      return res.status(400).json({ message: 'MinutesMeditated must be a number.' });
    }
    if (tags !== undefined && !Array.isArray(tags)) {
      return res.status(400).json({ message: 'Tags must be an array of strings.' });
    }

    const newEntry = new Entry({
      userId: req.user.id,
      mood,
      reflection,
      minutesMeditated,
      tags
    });
    await newEntry.save();
    res.status(201).json(newEntry);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.updateEntry = async (req, res) => {
  try {
    const { mood, reflection, minutesMeditated, tags } = req.body;
    // validation
    if (mood !== undefined && typeof mood !== 'string') {
      return res.status(400).json({ message: 'Mood must be a string.' });
    }
    if (minutesMeditated !== undefined && typeof minutesMeditated !== 'number') {
      return res.status(400).json({ message: 'MinutesMeditated must be a number.' });
    }
    if (tags !== undefined && !Array.isArray(tags)) {
      return res.status(400).json({ message: 'Tags must be an array of strings.' });
    }

    const entry = await Entry.findOneAndUpdate(
      { _id: req.params.id, userId: req.user.id },
      { ...req.body, updatedAt: Date.now() },
      { new: true }
    );
    if (!entry) return res.status(404).json({ message: 'Entry not found' });
    res.json(entry);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.deleteEntry = async (req, res) => {
  try {
    const entry = await Entry.findOneAndDelete({ _id: req.params.id, userId: req.user.id });
    if (!entry) return res.status(404).json({ message: 'Entry not found' });
    res.json({ message: 'Entry deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
