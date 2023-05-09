const requestOptions = (imgUrl) => {
    const PAT = '3555f4c5b75a41a58af10ca2a876be0f'
    const USER_ID = 'lookatthisdoode'
    const APP_ID = 'my-first-application'
    const IMAGE_URL = imgUrl

  const raw = JSON.stringify({
    "user_app_id": {
      "user_id": USER_ID,
      "app_id": APP_ID
    },
    "inputs": [
      {
        "data": {
          "image": {
            "url": IMAGE_URL
          }
        }
      }
    ]
  })

  const requestOptions = {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Authorization': 'Key ' + PAT
    },
    body: raw
  }

  return requestOptions
}

// so the image recognition is now handled by backend and api key hidden
const handleImage = (req, res) => {
	const { input } = req.body
	fetch("https://api.clarifai.com/v2/models/color-recognition/outputs", requestOptions(input))
    .then(result => result.json())
    .then(data => res.json(data))
}

export default handleImage;