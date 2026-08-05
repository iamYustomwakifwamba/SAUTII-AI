from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from rest_framework import status
from .service.helper.title_cleaner import generate_title


from .models import Jingle, JingleMessage


class CreateJingleView(APIView):

    permission_classes = [IsAuthenticated]

    def post(self, request):

        prompt = request.data.get("prompt")

        if not prompt:
            return Response(
                {
                    "error":"Prompt is required"
                },
                status=status.HTTP_400_BAD_REQUEST
            )

        title = generate_title(prompt)

        jingle = Jingle.objects.create(
            user=request.user,
            title=title,
        )

        JingleMessage.objects.create(
            jingle=jingle,
            role="user",
            content=prompt
        )

        return Response(
            {
                "message":"Jingle Chat created successfully",
                "data":{
                    "id":jingle.id,
                    "title":jingle.title
                }
            },
            status=status.HTTP_201_CREATED
        )

class JingleDetailView(APIView):

    permission_classes = [IsAuthenticated]

    def get(self, request, jingle_id):

        try:
            jingle = Jingle.objects.get(
                id=jingle_id,
                user=request.user
            )

        except Jingle.DoesNotExist:
            return Response(
                {
                    "error":"Jingle not found"
                },
                status=status.HTTP_404_NOT_FOUND
            )

        messages = []

        for message in jingle.messages.all().order_by("created_at"):
            messages.append({
                "id":message.id,
                "role":message.role,
                "content":message.content,
                "created_at":message.created_at
            })

        audios = []

        for audio in jingle.audio.all().order_by("-version"):
            audios.append({
                "id":audio.id,
                "version":audio.version,
                "file":audio.file.url if audio.file else None,
                "created_at":audio.created_at
            })

        return Response(
            {
                "id":jingle.id,
                "title":jingle.title,
                "status":jingle.status,
                "created_at":jingle.created_at,
                "messages":messages,
                "audio":audios
            },
            status=status.HTTP_200_OK
        )

class AddJingleMessageView(APIView):

    permission_classes = [IsAuthenticated]

    def post(self, request, jingle_id):

        try:
            jingle = Jingle.objects.get(
                id=jingle_id,
                user=request.user
            )

        except Jingle.DoesNotExist:
            return Response(
                {
                    "error":"Jingle not found"
                },
                status=status.HTTP_404_NOT_FOUND
            )


        content = request.data.get("content")


        if not content:
            return Response(
                {
                    "error":"Content is required"
                },
                status=status.HTTP_400_BAD_REQUEST
            )


        JingleMessage.objects.create(
            jingle=jingle,
            role="user",
            content=content
        )

        messages = []

        for message in jingle.messages.all().order_by("created_at"):
            messages.append({
                "id":message.id,
                "role":message.role,
                "content":message.content,
                "created_at":message.created_at
            })

        return Response(
            {
                "id":jingle.id,
                "title":jingle.title,
                "messages":messages
            },
            status=status.HTTP_200_OK
        )

class RecentJinglesView(APIView):

    permission_classes = [IsAuthenticated]

    def get(self, request):

        jingles = Jingle.objects.filter(
            user=request.user
        ).order_by("-created_at")[:10]

        return Response([
            {
                "id":j.id,
                "title":j.title,
                "created_at":j.created_at
            }
            for j in jingles
        ])
