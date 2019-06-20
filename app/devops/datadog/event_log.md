#Do Log

currenttime=$(date +%s)

curl  -X POST -H "Content-type: application/json" \
-d "{ \"series\" :
         [{\"metric\":\"test.metric\",
          \"points\":[[$currenttime, 20]],
          \"type\":\"rate\",
          \"interval\": 20,
          \"host\":\"test.example.com\",
          \"tags\":[\"environment:test\"]}
        ]
}" \
'https://api.datadoghq.com/api/v1/series?api_key=05e2ffce06f231ac9ef3f601559b4d91'