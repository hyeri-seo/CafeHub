package com.yummsters.cafehub.domain.cafeAd.entity;

import com.yummsters.cafehub.domain.cafe.entity.Cafe;
import com.yummsters.cafehub.domain.payment.entity.Payment;
import com.yummsters.cafehub.domain.review.entity.FileVo;
import lombok.*;

import javax.persistence.*;
import java.time.LocalDateTime;

@Entity
@Getter
@NoArgsConstructor
@Builder
@AllArgsConstructor
public class CafeAd {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer cafeAdNo;

    @Column(nullable = false)
    private String description;

    @Column(nullable = false)
    private String menu;

    @Column
    private boolean isPaid;

    @Column
    private boolean isApproved;

    @Column
    private LocalDateTime authDate;

    @OneToOne
    @JoinColumn(name = "cafeNo")
    private Cafe cafe;

    @OneToOne
    @JoinColumn(name = "fileNum", referencedColumnName = "fileNum")
    private FileVo fileVo;

    @OneToOne
    @JoinColumn(name = "paymentKey", referencedColumnName = "paymentKey")
    private Payment payment;

   /* public void addThumbImg(String thumbImg) {
        this.thumbImg = thumbImg;
    }*/

    public void addFile(FileVo fileVo) {
        this.fileVo = fileVo;
    }
    public void updatePaid(boolean isPaid) { this.isPaid = isPaid; }
    public void addPayment(Payment payment) { this.payment = payment; }
}