package iuh.fit.state;

import iuh.fit.Tax;

public interface TaxState {
    void handle(Tax context);
}
