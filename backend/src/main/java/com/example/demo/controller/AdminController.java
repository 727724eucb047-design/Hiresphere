package com.example.demo.controller;

import com.example.demo.dto.DashboardStatsDTO;
import com.example.demo.service.AdminService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/admin")
@CrossOrigin(origins = "*")
public class AdminController {

    private final AdminService adminService;

    public AdminController(AdminService adminService) {
        this.adminService = adminService;
    }

    @GetMapping("/stats")
    @PreAuthorize("hasAuthority('ROLE_ADMIN')")
    public ResponseEntity<DashboardStatsDTO> getStats() {
        return ResponseEntity.ok(adminService.getDashboardStats());
    }
    @GetMapping("/users")
@PreAuthorize("hasAuthority('ROLE_ADMIN')")
public ResponseEntity<?> getAllUsers() {
    return ResponseEntity.ok(
            adminService.getAllUsers()
    );
}

@PutMapping("/users/{id}/block")
@PreAuthorize("hasAuthority('ROLE_ADMIN')")
public ResponseEntity<?> blockUser(
        @PathVariable Long id) {

    return ResponseEntity.ok(
            adminService.blockUser(id)
    );
}

@PutMapping("/users/{id}/unblock")
@PreAuthorize("hasAuthority('ROLE_ADMIN')")
public ResponseEntity<?> unblockUser(
        @PathVariable Long id) {

    return ResponseEntity.ok(
            adminService.unblockUser(id)
    );
}
}
