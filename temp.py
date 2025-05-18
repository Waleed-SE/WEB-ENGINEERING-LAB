import numpy as np
import time

# Function to test CPU and RAM
def cpu_ram_test(size):
    # Create two large random matrices
    matrix_a = np.random.rand(size, size)
    matrix_b = np.random.rand(size, size)

    # Start the timer
    start_time = time.time()

    # Perform matrix multiplication
    result = np.dot(matrix_a, matrix_b)

    # End the timer
    end_time = time.time()

    print(f"Matrix multiplication of size {size}x{size} completed in {end_time - start_time:.2f} seconds.")

# Adjust the size based on your system's capability
cpu_ram_test(20000)  # You can increase this size for more stress