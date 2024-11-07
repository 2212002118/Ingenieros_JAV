const soap = require('soap');
const express= require('express');
const IP = '0.0.0.0'; // Poner IP servidor

const app = express();
const PORT = 3000;                                      //Puerto para usarse

const service =  {                                      //Creacion de un servicio
    CalculatorService: {                                //Serivicio a utilizar
        CalculatorPort: {                               //Puerto del servicio que se utiliza
            Add: function(args, callback){              //Uso de funcionalidad del servicio
                const intA = args.intA;                 //Asignacion en constantes
                const intB = args.intB;                 //Arriba x2
                const result=intA+intB;                 //Lo que hace el servicio
                callback(null, {AddResult: result});    //Regresa null si esta vacio, en caso contrario el resultado del servicio
            }
        }
    }
};

const wsdl= `
    
    <definitions xmlns="http://schemas.xmlsoap.org/wsdl/"
xmlns:soap12="http://schemas.xmlsoap.org/wsdl/soap12/"
xmlns:xs="http://www.w3.org/2001/XMLSchema"
xmlns:tns="http://www.example.org/calculator"
name="CalculatorService"
targetNamespace="http://www.example.org/calculator">
<types>
<xs:schema targetNamespace="http://www.example.org/calculator">
<xs:element name="Add">
<xs:complexType>
<xs:sequence>
<xs:element name="intA" type="xs:int"/>
<xs:element name="intB" type="xs:int"/>
</xs:sequence>
</xs:complexType>
</xs:element>
<xs:element name="AddResponse">
<xs:complexType>
<xs:sequence>
<xs:element name="AddResult" type="xs:int"/>
</xs:sequence>
</xs:complexType>
</xs:element>
</xs:schema>
</types>
<message name="AddRequest">
<part name="parameters" element="tns:Add"/>
</message>

<message name="AddResponse">
<part name="parameters" element="tns:AddResponse"/>
</message>
<portType name="CalculatorPortType">
<operation name="Add">
<input message="tns:AddRequest"/>
<output message="tns:AddResponse"/>
</operation>
</portType>
<binding name="CalculatorBinding" type="tns:CalculatorPortType">
<soap12:binding style="rpc"
transport="http://www.w3.org/2003/05/soap/bindings/HTTP/"/>
<operation name="Add">
<soap12:operation soapAction="http://www.example.org/calculator/Add"/>
<input>
<soap12:body use="literal"/>
</input>
<output>
<soap12:body use="literal"/>
</output>
</operation>
</binding>
<service name="CalculatorService">
<port name="CalculatorPort" binding="tns:CalculatorBinding">
<soap12:address location="http://${IP}:3000/calculator"/>
</port>
</service>
</definitions>
`;

app.listen(PORT, ()=>{
    soap.listen(app, '/calculator', service, wsdl);
    console.log('Servicio SOAP corriendo en http://${IP}:3000/calculator');
});



