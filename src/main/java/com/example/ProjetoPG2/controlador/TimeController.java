package com.example.ProjetoPG2.controlador;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import com.example.ProjetoPG2.entidade.Time;
import com.example.ProjetoPG2.repositorio.TimeRepository;

@RestController
public class TimeController {

    @Autowired
    private TimeRepository timeRepository;

    @GetMapping("/times")
    Iterable<Time> listarTimes() {
        return timeRepository.findAll();
    }

    @GetMapping("/times/{id}")
    ResponseEntity<Time> buscarTime(@PathVariable Long id) {
        Optional<Time> time = timeRepository.findById(id);
        if (time.isPresent()) {
            return ResponseEntity.ok(time.get());
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @PostMapping("/times")
    ResponseEntity<Time> adicionarTime(@RequestBody Time time) {
        Time novoTime = timeRepository.save(time);
        return ResponseEntity.status(HttpStatus.CREATED).body(novoTime);
    }

    @PutMapping("/times/{id}")
    ResponseEntity<Time> atualizarTime(@PathVariable Long id, @RequestBody Time time) {
        if (!timeRepository.existsById(id)) {
            return ResponseEntity.notFound().build();
        }
        time.setId(id);
        Time timeAtualizado = timeRepository.save(time);
        return ResponseEntity.ok(timeAtualizado);
    }

    @DeleteMapping("/times/{id}")
    ResponseEntity<Void> deletarTime(@PathVariable Long id) {
        if (!timeRepository.existsById(id)) {
            return ResponseEntity.notFound().build();
        }
        timeRepository.deleteById(id);
        return ResponseEntity.noContent().build();
    }
}
