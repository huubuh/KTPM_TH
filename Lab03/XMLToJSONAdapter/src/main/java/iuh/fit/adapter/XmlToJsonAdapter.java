package iuh.fit.adapter;

import iuh.fit.json.JsonService;
import iuh.fit.xml.XmlService;

public class XmlToJsonAdapter implements JsonService {
    private XmlService xmlService;

    public XmlToJsonAdapter(XmlService xmlService) {
        this.xmlService = xmlService;
    }

    @Override
    public void processJson(String jsonData) {
        System.out.println("Nhận dữ liệu JSON từ client:");
        System.out.println(jsonData);

        String xmlData = jsonToXml(jsonData);

        System.out.println("Chuyển từ JSON sang XML:");
        System.out.println(xmlData);

        xmlService.processXml(xmlData);
    }

    public String jsonToXml(String jsonData) {
        String content = jsonData
                .replace("{", "")
                .replace("}", "")
                .replace("\"", "");

        String[] parts = content.split(",");

        StringBuilder xmlBuilder = new StringBuilder();
        xmlBuilder.append("<root>");

        for (String part : parts) {
            String[] keyValue = part.split(":");
            if (keyValue.length == 2) {
                String key = keyValue[0].trim();
                String value = keyValue[1].trim();
                xmlBuilder.append("<").append(key).append(">")
                        .append(value)
                        .append("</").append(key).append(">");
            }
        }

        xmlBuilder.append("</root>");
        return xmlBuilder.toString();
    }

    public String xmlToJson(String xmlData) {
        return "{ \"message\": \"converted from xml\" }";
    }
}
