from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from .models import LeadData, CustomerData
from .serializers import LeadSerializer, CustomerSerializer
from django.db import IntegrityError

# Create your views here.

@api_view(['GET'])
def getLead(request):
    if request.GET.get("id"):
        try:
            lead = LeadData.objects.get(pk= request.GET.get("id"))
            serializer = LeadSerializer(lead)
            data = {**serializer.data, 'customer':CustomerData.objects.only('pk').filter(lead__pk=request.GET.get('id')).first()}
            return Response(data)
        except LeadData.DoesNotExist:
            return Response(data={'message':'please provide a valid lead id'}, status=status.HTTP_404_NOT_FOUND)
    form_data = LeadData.objects.all()
    serializer = LeadSerializer(form_data, many=True)
    return Response(serializer.data)


@api_view(['PATCH'])
def convert_to_customer(request, pk):
    print("Received pk:", pk)
    
    try:
        lead = LeadData.objects.get(id=pk)
    except LeadData.DoesNotExist:
        return Response({'error': 'Lead not found'}, status=404)

    if CustomerData.objects.filter(lead=lead).exists():
        return Response({'message': 'Already converted'}, status=400)

    try:
        customer = CustomerData.objects.create(
            lead=lead,
            name=lead.name,
            email=lead.email,
            phone=lead.phone
        )

        return Response({'message': 'Converted successfully', 'customer_id': customer.pk}, status=200)

    except IntegrityError:
        return Response({'error': 'Customer with this email already exists'}, status=400)

    except Exception as e:
        print("Conversion error:", e)
        import traceback; traceback.print_exc()
        return Response({'error': 'Internal Server Error'}, status=500)

@api_view(['POST'])
def createLead(request):
    serializer = LeadSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['PUT'])
def updateLead(request,pk):
    form_data = LeadData.objects.get(id=pk)
    serializer = LeadSerializer(form_data, data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['DELETE'])
def deleteLead(request, pk):
    form_data = LeadData.objects.get(id=pk)
    form_data.delete()
    return Response({'message': 'Lead detail deleted successfully'})

@api_view(['GET'])
def getCustomer(request):
    form_data = CustomerData.objects.all()
    serializer = CustomerSerializer(form_data, many=True)
    return Response(serializer.data)

@api_view(['POST'])
def createCustomer(request):
    serializer = CustomerSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['PUT'])
def updateCustomer(request,pk):
    form_data = CustomerData.objects.get(id=pk)
    serializer = LeadSerializer(form_data, data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['DELETE'])
def deleteCustomer(request, pk):
    form_data = CustomerData.objects.get(id=pk)
    form_data.delete()
    return Response({'message': 'Customer detail delted successfully'})

