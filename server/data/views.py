from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from .models import Lead_Data, Customer_Data
from .serializers import LeadSerializer, CustomerSerializer

# Create your views here.

@api_view(['GET'])
def getLead(request):
    form_data = Lead_Data.objects.all()
    serializer = LeadSerializer(form_data, many=True)
    return Response(serializer.data)

@api_view(['POST'])
def createLead(request):
    serializer = LeadSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['DELETE'])
def deleteLead(request, pk):
    form_data = Lead_Data.objects.get(id=pk)
    form_data.delete()
    return Response({'message': 'Lead detail deleted successfully'})

@api_view(['GET'])
def getCustomer(request):
    form_data = Customer_Data.objects.all()
    serializer = CustomerSerializer(form_data, many=True)
    return Response(serializer.data)

@api_view(['POST'])
def createCustomer(request):
    serializer = CustomerSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['DELETE'])
def deleteCustomer(request, pk):
    form_data = Customer_Data.objects.get(id=pk)
    form_data.delete()
    return Response({'message': 'Customer detail delted successfully'})