package iuh.fit.paymentservice.client;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

@Service
public class OrderClient {

    @Autowired
    private RestTemplate restTemplate;

    public void updateOrderStatus(Long orderId, String status) {
        String url = "http://172.16.57.17:8083/orders/"
                + orderId + "/status?status=" + status;

        restTemplate.put(url, null);
    }
}
