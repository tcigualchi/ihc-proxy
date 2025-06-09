module.exports = async (req, res) => {
  const url = req.query.url;
  
  if (!url) {
    return res.status(400).json({ error: 'URL parameter is required' });
  }

  try {
    const fetch = (await import('node-fetch')).default;
    const response = await fetch(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
      }
    });
    
    const text = await response.text();
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.status(200).json({ contents: text });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};