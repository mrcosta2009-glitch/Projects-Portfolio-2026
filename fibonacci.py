# Fibonacci Sequence Generator with Value Limit

print("--- Fibonacci Sequence Generator ---")

user_input = input("Enter the value limit for the sequence: ")

if user_input.isdigit():
    limit = int(user_input)
    
    if limit <= 0:
        print("Sequence:")
    else:
        # We use simple variables only
        a = 0
        b = 1
        print("Sequence:", end="")
        
        while a < limit:
            # Print leading comma and space if it's not the first number
            if a == 0:
                print(f" {a}", end="")
            else:
                print(f", {a}", end="")
            
            # Update values
            a, b = b, a + b
        print() # New line at the end
else:
    print("Invalid input. Please enter a positive integer.")
