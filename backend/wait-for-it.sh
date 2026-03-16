#!/bin/bash
# wait-for-it.sh

HOST=$1
PORT=$2
shift 2  # 호스트와 포트(2개)를 빼고 나머지를 명령어로 인식

until nc -z "$HOST" "$PORT"; do
  echo "⏳ Elasticsearch($HOST:$PORT)가 준비될 때까지 기다리는 중..."
  sleep 3
done

echo "✅ Elasticsearch 연결 성공! 백엔드 서비스를 시작합니다."

# 이제 남은 명령어(java -jar app.jar)를 실행합니다.
exec "$@"