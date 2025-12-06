#include <iostream>
#include <string>
using namespace std;

class BankAccount {
private:
    string accountHolder;
    int accountNumber;
    double balance;

public:
    // Constructor
    BankAccount(string holder, int accNo, double initialBalance) {
        accountHolder = holder;
        accountNumber = accNo;
        balance = initialBalance;
    }

    // Deposit money
    void deposit(double amount) {
        if (amount > 0) {
            balance += amount;
            cout << "Deposited: " << amount << " INR" << endl;
        } else {
            cout << "Invalid deposit amount!" << endl;
        }
    }

    // Withdraw money
    void withdraw(double amount) {
        if (amount > 0 && amount <= balance) {
            balance -= amount;
            cout << "Withdrawn: " << amount << " INR" << endl;
        } else {
            cout << "Invalid or insufficient balance!" << endl;
        }
    }

    // Display account info
    void displayInfo() {
        cout << "\n--- Account Details ---" << endl;
        cout << "Account Holder: " << accountHolder << endl;
        cout << "Account Number: " << accountNumber << endl;
        cout << "Current Balance: " << balance << " INR" << endl;
    }
};

int main() {
    // Creating objects (instances of class)
    BankAccount acc1("Valak", 1001, 5000.0);
    BankAccount acc2("Annabelle", 1002, 10000.0);

    acc1.displayInfo();
    acc1.deposit(2000);
    acc1.withdraw(1500);
    acc1.displayInfo();

    acc2.displayInfo();
    acc2.withdraw(12000);  // Will show insufficient balance
    acc2.deposit(3000);
    acc2.displayInfo();

    return 0;
}
