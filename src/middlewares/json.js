export async function json(req, res) {
  const buffer = [];

  for await (const chunk of req) {
    buffer.push(chunk);
  }

  try {
    // eslint-disable-next-line node/prefer-global/buffer
    req.body = JSON.parse(Buffer.concat(buffer).toString());
  } catch {
    req.body = null;
  }

  res.setHeader('Content-type', 'application/json');
}
