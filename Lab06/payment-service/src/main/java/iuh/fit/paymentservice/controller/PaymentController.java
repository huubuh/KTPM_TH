package iuh.fit.paymentservice.controller;

import iuh.fit.paymentservice.dto.PaymentRequest;
import iuh.fit.paymentservice.dto.PaymentResponse;
import iuh.fit.paymentservice.service.PaymentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/payments")
public class PaymentController {

    @Autowired
    private PaymentService paymentService;

    @PostMapping
    public PaymentResponse pay(@RequestBody PaymentRequest request) {
        return paymentService.process(request);
    }
}
