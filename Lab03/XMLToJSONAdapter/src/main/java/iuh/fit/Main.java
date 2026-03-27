package iuh.fit;

import iuh.fit.adapter.XmlToJsonAdapter;
import iuh.fit.json.JsonService;
import iuh.fit.xml.XmlService;


public class Main {
    public static void main(String[] args) {
        XmlService xmlService = new XmlService();

        JsonService jsonService = new XmlToJsonAdapter(xmlService);

        String jsonData = "{ \"name\": \"An\", \"task\": \"Design Pattern\" }";

        jsonService.processJson(jsonData);
    }
}